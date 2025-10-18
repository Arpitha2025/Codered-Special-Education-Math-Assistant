import os
import io
import json
import requests
from flask import Flask, request, jsonify, send_file
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# --- Configuration ---
app = Flask(__name__, static_folder='.', static_url_path='')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16MB

# Mathpix API Configuration
MATHPIX_APP_ID = os.getenv("MATHPIX_APP_ID")
MATHPIX_APP_KEY = os.getenv("MATHPIX_APP_KEY")

# ElevenLabs Configuration
ELEVEN_KEY = os.getenv("ELEVEN_API_KEY")
VOICES = {
    "Maya": "EXAVITQu4vr4xnSDxMaL",
    "Joey": "lLM2bI7XZWLA1bTu2pPJ",
    "Bella": "bmAn0TLASQN7ctGBMHgN"
}

# Initialize Gemini
GEMINI_CLIENT = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
GEMINI_MODEL = "gemini-2.0-flash-exp"


# --- Mathpix OCR Function ---

def call_mathpix_ocr(file_bytes, filename):
    """
    Sends file to Mathpix API using the correct v3/text endpoint.
    Mathpix requires multipart/form-data with 'file' and 'options_json'.
    """
    
    url = "https://api.mathpix.com/v3/text"
    
    headers = {
        "app_id": MATHPIX_APP_ID,
        "app_key": MATHPIX_APP_KEY
    }
    
    # Mathpix options for OCR
    options = {
        "conversion_formats": {
            "docx": True,
            "tex.zip": True
        },
        "math_inline_delimiters": ["$", "$"],
        "rm_spaces": True,
        "enable_tables_fallback": True
    }
    
    try:
        print(f"\n{'='*60}")
        print(f"📄 Processing file: {filename}")
        print(f"📊 File size: {len(file_bytes)} bytes")
        print(f"🔑 Using Mathpix API")
        print(f"   App ID: {MATHPIX_APP_ID[:10]}..." if MATHPIX_APP_ID else "   App ID: MISSING")
        
        if not MATHPIX_APP_ID or not MATHPIX_APP_KEY:
            raise ValueError("Mathpix API credentials are not configured in .env file")
        
        # Prepare the multipart form data
        files = {
            'file': (filename, io.BytesIO(file_bytes), 'application/pdf')
        }
        
        data = {
            'options_json': json.dumps(options)
        }
        
        print(f"🔄 Sending request to Mathpix...")
        
        # Make the request to Mathpix
        response = requests.post(
            url,
            headers=headers,
            files=files,
            data=data,
            timeout=90  # Increased timeout for larger files
        )
        
        print(f"📡 Response status: {response.status_code}")
        
        # Check for HTTP errors
        if response.status_code == 401:
            print("❌ Authentication failed - check your Mathpix credentials")
            raise ValueError("Mathpix authentication failed. Please verify your APP_ID and APP_KEY in the .env file.")
        
        if response.status_code == 400:
            print(f"❌ Bad request: {response.text}")
            raise ValueError(f"Invalid file or request format: {response.text}")
        
        if response.status_code == 429:
            print("❌ Rate limit exceeded")
            raise ValueError("Mathpix API rate limit exceeded. Please wait or upgrade your plan.")
        
        response.raise_for_status()
        
        # Parse the JSON response
        result = response.json()
        
        print(f"✅ OCR successful")
        print(f"📝 Response keys: {list(result.keys())}")
        
        # Check for errors in the response
        if 'error' in result:
            error_msg = result.get('error', 'Unknown error')
            error_info = result.get('error_info', {})
            print(f"❌ Mathpix error: {error_msg}")
            print(f"   Error info: {error_info}")
            raise ValueError(f"Mathpix OCR error: {error_msg}")
        
        # Extract the text content
        # Mathpix returns different formats - prioritize text and latex_styled
        text_content = result.get('text', '')
        latex_styled = result.get('latex_styled', '')
        
        print(f"📊 Extracted text length: {len(text_content)} chars")
        print(f"📊 Extracted LaTeX length: {len(latex_styled)} chars")
        
        if text_content:
            print(f"📄 Text preview: {text_content[:200]}...")
        
        return result
    
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
        raise ValueError(f"Failed to connect to Mathpix API: {str(e)}")
    
    except json.JSONDecodeError as e:
        print(f"❌ JSON decode error: {e}")
        print(f"Raw response: {response.text[:500]}")
        raise ValueError("Invalid response from Mathpix API")
    
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        raise


def extract_text_from_mathpix_response(mathpix_response):
    """
    Extracts usable text from Mathpix response.
    Tries multiple formats in order of preference.
    """
    
    # Try different text formats from Mathpix
    text = mathpix_response.get('text', '')
    
    if not text:
        # Try latex_styled format
        text = mathpix_response.get('latex_styled', '')
    
    if not text:
        # Try html format
        text = mathpix_response.get('html', '')
    
    if not text:
        # Try markdown format
        text = mathpix_response.get('markdown', '')
    
    # Clean up the text
    text = text.strip()
    
    print(f"📝 Final extracted text length: {len(text)} characters")
    
    if text:
        print(f"📄 First 300 chars:\n{text[:300]}")
    
    return text


def get_profile_instruction(profiles):
    """Generate system instruction based on selected profiles."""
    
    if not profiles or profiles == ['Standard']:
        return "Provide clear, well-structured answers with proper formatting."
    
    instructions = []
    
    if 'Reading & Language Support' in profiles:
        instructions.append(
            "Use simple, clear language (8th grade level). "
            "**Bold** key terms. Use short paragraphs with clear spacing."
        )
    
    if 'Focus & Planning Support' in profiles:
        instructions.append(
            "Start with a brief summary. "
            "Break everything into numbered steps. "
            "Use checklists and highlight action items."
        )
    
    if 'Math Understanding Support' in profiles:
        instructions.append(
            "Break down math step-by-step. "
            "Provide real-world analogies. "
            "Use numbered procedures and visual organization."
        )
    
    if 'Writing & Expression Support' in profiles:
        instructions.append(
            "Use structured lists and bullet points. "
            "Avoid long complex sentences. "
            "Provide clear, actionable instructions."
        )
    
    if 'Listening & Hearing Support' in profiles:
        instructions.append(
            "Use direct, simple language. "
            "Structure with clear headings. "
            "Avoid complex analogies."
        )
    
    if 'Vision & Screen-Reader Support' in profiles:
        instructions.append(
            "Use clear, unambiguous language. "
            "Avoid visual metaphors. "
            "Describe all implied visual information. "
            "Use consistent, simple formatting."
        )
    
    return " ".join(instructions)


# --- Flask Routes ---

@app.route('/')
def index():
    """Serve the main HTML page."""
    return app.send_static_file('index.html')


@app.route('/test-keys')
def test_keys():
    """Test endpoint to verify API keys."""
    return jsonify({
        "mathpix_app_id": "✓ Set" if MATHPIX_APP_ID else "✗ Missing",
        "mathpix_app_key": "✓ Set" if MATHPIX_APP_KEY else "✗ Missing",
        "gemini_api_key": "✓ Set" if os.getenv("GEMINI_API_KEY") else "✗ Missing",
        "elevenlabs_key": "✓ Set" if ELEVEN_KEY else "✗ Missing (optional)"
    })


@app.route('/chat', methods=['POST'])
def chat():
    """Main endpoint for document Q&A with Mathpix OCR."""
    
    print("\n" + "="*60)
    print("📨 NEW CHAT REQUEST")
    print("="*60)
    
    # Validate input
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    user_prompt = request.form.get('prompt', '').strip()
    profile_types = request.form.getlist('profile_types')
    
    print(f"📝 User prompt: {user_prompt[:100]}...")
    print(f"👤 Profiles: {profile_types}")
    
    if not file or file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    if not user_prompt:
        return jsonify({"error": "No question provided"}), 400
    
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Only PDF files are supported"}), 400
    
    # Check API keys
    if not MATHPIX_APP_ID or not MATHPIX_APP_KEY:
        return jsonify({
            "error": "⚠️ Mathpix API keys are missing. Please add MATHPIX_APP_ID and MATHPIX_APP_KEY to your .env file."
        }), 500
    
    if not os.getenv("GEMINI_API_KEY"):
        return jsonify({
            "error": "⚠️ Gemini API key is missing. Please add GEMINI_API_KEY to your .env file."
        }), 500
    
    # Read file
    try:
        file_bytes = file.read()
        
        if len(file_bytes) == 0:
            return jsonify({"error": "The uploaded file is empty"}), 400
        
        print(f"✅ File read successfully: {len(file_bytes)} bytes")
        
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return jsonify({"error": f"Failed to read file: {str(e)}"}), 500
    
    # Process with Mathpix OCR
    try:
        print("\n🔍 STARTING MATHPIX OCR...")
        
        mathpix_response = call_mathpix_ocr(file_bytes, file.filename)
        
        # Extract text from response
        context = extract_text_from_mathpix_response(mathpix_response)
        
        if not context or len(context) < 10:
            return jsonify({
                "error": "❌ No readable text was extracted from the PDF. Please ensure:\n"
                        "1. The PDF contains actual text (not just scanned images)\n"
                        "2. The PDF is not corrupted or password-protected\n"
                        "3. The file is a valid PDF document"
            }), 500
        
        print(f"✅ Successfully extracted {len(context)} characters from document")
        
    except ValueError as e:
        error_msg = str(e)
        print(f"❌ Mathpix error: {error_msg}")
        return jsonify({"error": error_msg}), 500
    
    except Exception as e:
        error_msg = f"OCR processing failed: {str(e)}"
        print(f"❌ Unexpected OCR error: {e}")
        return jsonify({"error": error_msg}), 500
    
    # Generate AI response with Gemini
    try:
        print("\n🤖 GENERATING AI RESPONSE...")
        
        # Build system instruction
        profile_instruction = get_profile_instruction(profile_types)
        
        system_instruction = f"""You are an Accessible Study Assistant helping students understand educational materials.

ACCESSIBILITY GUIDELINES:
{profile_instruction}

DOCUMENT CONTENT:
{context[:4000]}

IMPORTANT RULES:
1. Answer ONLY using information from the document content above
2. If the answer is not in the document, clearly state that
3. Apply the accessibility guidelines in your response
4. Be helpful, clear, and supportive"""

        full_prompt = f"{system_instruction}\n\nSTUDENT QUESTION: {user_prompt}\n\nYour answer:"
        
        print(f"📊 Prompt length: {len(full_prompt)} characters")
        print(f"🔄 Calling Gemini API...")
        
        response = GEMINI_CLIENT.models.generate_content(
            model=GEMINI_MODEL,
            contents=full_prompt
        )
        
        answer = response.text
        
        print(f"✅ Generated response: {len(answer)} characters")
        print(f"📄 Response preview: {answer[:200]}...")
        
        return jsonify({
            "response": answer,
            "status": "success",
            "profile_types_used": profile_types,
            "characters_extracted": len(context)
        })
    
    except Exception as e:
        error_msg = f"AI processing failed: {str(e)}"
        print(f"❌ Gemini error: {e}")
        return jsonify({"error": error_msg}), 500


@app.route('/voices')
def voices():
    """Return available ElevenLabs voices."""
    return jsonify(list(VOICES.keys()))


@app.route('/tts', methods=['POST'])
def tts():
    """Text-to-speech with ElevenLabs."""
    
    data = request.json
    text = data.get("text", "")
    voice_name = data.get("voice", "Maya")
    
    if not text:
        return {"error": "No text provided"}, 400
    
    if not ELEVEN_KEY:
        print("⚠️ ELEVEN_API_KEY not set - TTS disabled")
        # Return a simple error audio or empty response
        return {"error": "ElevenLabs API key not configured"}, 500
    
    voice_id = VOICES.get(voice_name, VOICES["Maya"])
    
    print(f"🔊 TTS request for voice '{voice_name}'")
    
    try:
        response = requests.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
            headers={
                "xi-api-key": ELEVEN_KEY,
                "Content-Type": "application/json"
            },
            json={
                "text": text[:1000],  # Limit text length
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.75
                }
            },
            timeout=30
        )
        
        if response.status_code != 200:
            print(f"❌ ElevenLabs failed: {response.status_code}")
            return {"error": f"TTS failed: {response.status_code}"}, 500
        
        audio_bytes = io.BytesIO(response.content)
        return send_file(
            audio_bytes,
            mimetype="audio/mpeg",
            as_attachment=False,
            download_name="speech.mp3"
        )
    
    except Exception as e:
        print(f"❌ TTS Error: {e}")
        return {"error": str(e)}, 500


# --- Run Server ---
if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 ACCESSIBLE STUDY ASSISTANT")
    print("="*60)
    print(f"\n📍 Server: http://127.0.0.1:5000/")
    print(f"🔧 Test: http://127.0.0.1:5000/test-keys")
    print(f"\n🔑 API Keys:")
    print(f"   Mathpix ID:  {'✓' if MATHPIX_APP_ID else '✗ MISSING'}")
    print(f"   Mathpix Key: {'✓' if MATHPIX_APP_KEY else '✗ MISSING'}")
    print(f"   Gemini Key:  {'✓' if os.getenv('GEMINI_API_KEY') else '✗ MISSING'}")
    print(f"   ElevenLabs:  {'✓' if ELEVEN_KEY else '✗ MISSING (optional)'}")
    
    if not MATHPIX_APP_ID or not MATHPIX_APP_KEY:
        print(f"\n⚠️  WARNING: Mathpix keys are missing!")
        print(f"   Get them from: https://mathpix.com/")
    
    if not os.getenv('GEMINI_API_KEY'):
        print(f"\n⚠️  WARNING: Gemini key is missing!")
        print(f"   Get it from: https://makersuite.google.com/app/apikey")
    
    print("\n" + "="*60)
    print("Press CTRL+C to stop\n")
    
    app.run(debug=True, port=5000, host='127.0.0.1')
