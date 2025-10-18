import os
import io
import json
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16MB file upload

# API Keys and URLs
MATHPIX_URL = "https://api.mathpix.com/v3/text" # Using /v3/text for quick image/PDF snippets
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
    
    # Mathpix request data - we ask for text, mathml, and LaTeX
    options = {
        "formats": ["text", "mathml", "latex_styled"],
        "math_inline_delimiters": ["$", "$"],
        "text_delimiters": ["\n", "\n"],
        "conversion_delimiters": ["$$", "$$"],
        "include_line_data": True # Important for distinguishing text from math
    }

    files = {
        'file': (filename, file_stream, 'application/pdf' if filename.endswith('.pdf') else 'image/jpeg'),
        'options_json': (None, json.dumps(options), 'application/json')
    }

    try:
        response = requests.post(MATHPIX_URL, headers=MATHPIX_HEADERS, files=files, timeout=60)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Mathpix API Error: {e}")
        raise ValueError(f"OCR service failed: {e}")


def parse_mathpix_output(ocr_response):
    """
    Parses the flat Mathpix output into a structured, block-based format.
    This is simplified; a full parser would analyze line_data for precise blocks.
    Here we rely on Mathpix Markdown structure to split.
    """
    
    # Split content by block-mode LaTeX delimiters ($$)
    raw_blocks = ocr_response.get('latex_styled', '').split('$$')
    
    structured_content = []
    
    for i, block in enumerate(raw_blocks):
        block = block.strip()
        if not block:
            continue

        if block.startswith('\\begin') or block.startswith('\\['): # Heuristic for math environment
            block_type = "equation"
            # Attempt to find the corresponding MathML for the equation (very simplified)
            # In a real app, you'd match the 'latex' with the 'mathml' block using coordinates/IDs from line_data
            mathml_match = f"<math>{block.strip(' \\[').strip(' \\]')}</math>" # Placeholder for real MathML matching

            # Use the raw LaTeX for the original_text/source
            structured_content.append({
                "id": i + 1,
                "type": block_type,
                "original_text": block, 
                "mathml": ocr_response.get('mathml', '').replace('\\(', '$').replace('\\)', '$'), # Placeholder: In a real app, you'd isolate the MathML for this block.
                "adapted_scaffolding": ""
            })

        else:
            block_type = "prose"
            structured_content.append({
                "id": i + 1,
                "type": block_type,
                "original_text": block,
                "adapted_text": ""
            })
            
    return structured_content

def adapt_content_with_gemini(content_block, disorder):
    """Applies AI adaptation based on the specified disorder."""
    
    original_text = content_block.get("original_text", "")
    prompt = ""

    # --- Dyslexia / Language Adaptation (Prose) ---
    if content_block["type"] == "prose" and disorder in ["Dyslexia", "Language Disorder"]:
        prompt = (
            f"You are an educational AI. Simplify the following math word problem for a student with Dyslexia/Language Disorder. "
            f"Use simple sentences, short paragraphs, and **bold** the key mathematical operation words. "
            f"Problem: {original_text}"
        )
        
    # --- Dyscalculia / Executive Function Adaptation (Math) ---
    elif content_block["type"] == "equation" and disorder in ["Dyscalculia", "Executive Function", "ADHD"]:
        prompt = (
            f"You are an adaptive learning AI. For the following math equation/concept (LaTeX format: {original_text}), "
            f"generate a simple, step-by-step procedure checklist (numbered list) for solving it. "
            f"Also, provide a short, real-world analogy (conceptual anchor) for the core concept. "
            f"Respond only with the markdown content."
        )
        
    # If no specific adaptation is needed, return the original block
    if not prompt:
        return content_block

    try:
        response = GEMINI_CLIENT.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )
        
        # Update the block with the AI's response
        if content_block["type"] == "prose":
            content_block["adapted_text"] = response.text
        elif content_block["type"] == "equation":
            content_block["adapted_scaffolding"] = response.text
            
    except Exception as e:
        print(f"Gemini API Error for block {content_block['id']}: {e}")
        # Fallback to original content
        if content_block["type"] == "prose":
            content_block["adapted_text"] = original_text
            
    return content_block


# --- Flask Route ---

@app.route('/api/adapt', methods=['POST'])
def adapt_textbook():
    """Main endpoint to handle file upload, OCR, and AI adaptation."""
    
    # 1. Input Validation and Retrieval
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    disorder = request.form.get('disorder', 'None')
    if disorder not in ["Dyscalculia", "Dyslexia", "Dysgraphia", "Language Disorder", "Executive Function", "ADHD", "None"]:
        return jsonify({"error": "Invalid disorder specified"}), 400

    # 2. Mathpix OCR and Parsing
    try:
        # Read the file stream for the API call
        file_stream = io.BytesIO(file.read())
        
        # Get OCR response
        ocr_response = call_mathpix_ocr(file_stream, file.filename)
        
        # Convert raw output into structured blocks
        content_blocks = parse_mathpix_output(ocr_response)
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred during OCR/Parsing: {str(e)}"}), 500


    # 3. AI Adaptation Loop
    adapted_content = []
    for block in content_blocks:
        # Apply AI only if a specific disorder is selected that requires it
        if disorder != 'None':
            block = adapt_content_with_gemini(block, disorder)
        else:
            # If no disorder, ensure original text is copied to adapted fields for display
            if block["type"] == "prose":
                block["adapted_text"] = block["original_text"]
            
        adapted_content.append(block)

    # 4. Final Response
    return jsonify({
        "status": "success",
        "disorder_profile": disorder,
        "content": adapted_content
    })

# --- Run Server ---
if __name__ == '__main__':
    # Use a high port for hackathon development
    print("Server running at http://127.0.0.1:8080/api/adapt")
    app.run(debug=True, port=8080)
