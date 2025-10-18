import os
import io
import json
import requests
# 👇 NEW IMPORT: render_template is needed to serve the HTML file
from flask import Flask, request, jsonify, render_template 
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
app = Flask(__name__)
# Max 16MB file upload (default in user's original code)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

# API Keys and URLs
# Using /v3/text for quick image/PDF snippets
MATHPIX_URL = "https://api.mathpix.com/v3/text" 
MATHPIX_HEADERS = {
    "app_id": os.getenv("MATHPIX_APP_ID"),
    "app_key": os.getenv("MATHPIX_APP_KEY"),
}

# Initialize Gemini Client
GEMINI_CLIENT = genai.Client()
GEMINI_MODEL = "gemini-2.5-flash"


# --- Core Logic Functions ---

def call_mathpix_ocr(file_stream, filename):
    """Sends the uploaded file to the Mathpix API and returns the response JSON."""
    
    # Mathpix request data - we ask for text, mathml, and LaTeX (latex_styled for full text)
    options = {
        "formats": ["latex_styled"], # Use latex_styled as it provides a single string with both text and LaTeX
        "math_inline_delimiters": ["$", "$"],
        "text_delimiters": ["\n", "\n"],
        "conversion_delimiters": ["$$", "$$"],
    }

    files = {
        'file': (filename, file_stream, 'application/pdf' if filename.endswith('.pdf') else 'image/jpeg'),
        'options_json': (None, json.dumps(options), 'application/json')
    }

    try:
        # Reset stream position to the beginning before sending
        file_stream.seek(0)
        response = requests.post(MATHPIX_URL, headers=MATHPIX_HEADERS, files=files, timeout=60)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Mathpix API Error: {e}")
        # Raise an exception that the Flask route can catch
        raise ValueError(f"OCR service failed or timed out. Check your Mathpix keys and document quality.")


def generate_system_instruction(disorder, context):
    """
    Creates a comprehensive system instruction for the Gemini model
    to act as an accessible, RAG-enabled study assistant.
    """
    base_persona = (
        "You are an **Accessible Study Assistant** with expertise in mathematics and pedagogy. "
        "Your primary goal is to answer the user's question based *only* on the provided context "
        "(the textbook page content). "
    )
    
    # --- Adaptive RAG Instructions ---
    adaptive_instruction = ""
    if disorder == "None":
        adaptive_instruction = (
            "Answer clearly and accurately, using standard academic language. "
            "For math problems, provide a detailed, step-by-step solution."
        )
    elif disorder == "Dyscalculia":
        adaptive_instruction = (
            "The student has Dyscalculia. Be a supportive math tutor: "
            "1. Break down all explanations and solutions into a clear, numbered, step-by-step procedure/checklist. "
            "2. Provide a simple, real-world analogy for the core concept. "
            "3. Use bold text and bullet points to organize information. "
            "4. Be encouraging and manage cognitive load by keeping sentences direct and concise."
        )
    elif disorder == "Executive Function":
        adaptive_instruction = (
            "The student has Executive Function Disorder/ADHD. Be a structured tutor: "
            "1. Start with a brief, single-sentence summary of the answer. "
            "2. Follow with a clear, numbered, step-by-step procedure/checklist for solving problems. "
            "3. Use short paragraphs and bold key terms. "
            "4. Do not offer extraneous information; stay focused on the user's explicit question."
        )
    elif disorder == "Dyslexia":
        adaptive_instruction = (
            "The student has Dyslexia. Be a supportive tutor focused on language accessibility: "
            "1. Simplify all complex sentences (use a maximum 8th-grade reading level). "
            "2. **Bold** all key mathematical terms and operation words. "
            "3. Use short paragraphs and clear visual spacing. "
            "4. Maintain a friendly and encouraging tone."
        )
    
    # --- RAG Context and Constraint ---
    rag_instruction = (
        "\n\n--- DOCUMENT CONTEXT START ---\n\n"
        f"{context}"
        "\n\n--- DOCUMENT CONTEXT END ---\n\n"
        "**CRITICAL CONSTRAINT:** Answer the user's question *strictly* using the information in the 'DOCUMENT CONTEXT' above. "
        "Do not use external knowledge. If the context does not contain the answer, state: 'I'm sorry, I could not find the answer in the provided document.' Apply all accessibility rules to your final answer."
    )

    return base_persona + adaptive_instruction + rag_instruction

# 👇 NEW ROUTE: This handles GET requests to the root URL (http://127.0.0.1:5000/)
@app.route('/', methods=['GET'])
def index():
    """Serves the main HTML page for the frontend application."""
    # Flask looks for 'index.html' inside the 'templates' folder
    return render_template('index.html')


# --- Flask Route ---

@app.route('/chat', methods=['POST'])
def chat_assistant():
    """Main endpoint to handle file upload, OCR, RAG, and AI adaptation."""
    
    # 1. Input Validation and Retrieval
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    user_prompt = request.form.get('prompt', '').strip()
    disorder = request.form.get('disorder', 'None')
    
    if file.filename == '' or not file:
        return jsonify({"error": "No selected file"}), 400
    if not user_prompt:
        return jsonify({"error": "No question (prompt) provided"}), 400
        
    valid_disorders = ["Dyscalculia", "Dyslexia", "Executive Function", "None"]
    if disorder not in valid_disorders:
        return jsonify({"error": f"Invalid disorder specified: {disorder}. Must be one of {valid_disorders}"}), 400

    # 2. Mathpix OCR and Context Generation
    try:
        # Read the file stream once and store it
        file_stream = io.BytesIO(file.read())
        
        # Get OCR response
        ocr_response = call_mathpix_ocr(file_stream, file.filename)
        
        # Use the combined text and LaTeX output as the RAG context
        context = ocr_response.get('latex_styled', '').strip()
        
        if not context:
            return jsonify({"error": "OCR failed to extract readable text from the document."}), 500

    except ValueError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred during OCR: {str(e)}"}), 500


    # 3. Gemini RAG with Adaptive Instruction
    try:
        system_instruction = generate_system_instruction(disorder, context)
        
        response = GEMINI_CLIENT.models.generate_content(
            model=GEMINI_MODEL,
            contents=[user_prompt],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction
            )
        )
        
        # 4. Final Response (matches frontend expectation: {"response": "..."})
        return jsonify({
            "response": response.text,
            "status": "success",
            "disorder_profile": disorder
        })
            
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return jsonify({"error": f"An error occurred while calling the Gemini API: {str(e)}"}), 500


# --- Run Server ---
if __name__ == '__main__':
    # Use a high port for hackathon development
    print("Server running at http://127.0.0.1:5000/")
    # Changed port to 5000, common for Flask/local deployment
    app.run(debug=True, port=5000)
