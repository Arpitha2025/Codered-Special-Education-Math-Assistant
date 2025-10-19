from io import BytesIO
from flask import Flask, request, send_file, jsonify
import requests
from dotenv import load_dotenv
import os

load_dotenv()

ELEVEN_KEY = os.getenv("ELEVEN_API_KEY")

# Replace these with your actual ElevenLabs Voice IDs
VOICES = {
    "Maya": "Bn9xWp6PwkrqKRbq8cX2",  # Replace with your Rachel voice ID
    "Joey": "pNInz6obpgDQGcFUe3KZ",    # Replace with your Domi voice ID
    "Bella": "pNInz6obpgDQGcFUe3KZ"    # Replace with your Bella voice ID
}

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route("/voices")
def voices():
    """Return list of available voice names"""
    return jsonify(list(VOICES.keys()))

@app.route("/tts", methods=["POST"])
def tts():
    data = request.json
    text = data.get("text", "")
    voice_name = data.get("voice", "Rachel")
    
    if not text:
        return {"error": "No text provided"}, 400
    
    if not ELEVEN_KEY:
        print("ELEVEN_API_KEY is not set!")
        return {"error": "ElevenLabs API key not configured"}, 500
    
    # Get voice ID from the VOICES dictionary
    voice_id = VOICES.get(voice_name, VOICES["Rachel"])
    
    print(f"Sending TTS request for voice '{voice_name}' (ID: {voice_id})")
    
    try:
        response = requests.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
            headers={
                "xi-api-key": ELEVEN_KEY,
                "Content-Type": "application/json"
            },
            json={
                "text": text,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.75
                }
            }
        )
        
        if response.status_code != 200:
            print(f"ElevenLabs TTS failed: {response.status_code} - {response.text}")
            return {"error": f"TTS failed: {response.status_code}"}, 500
        
        audio_bytes = BytesIO(response.content)
        return send_file(
            audio_bytes,
            mimetype="audio/mpeg",
            as_attachment=False,
            download_name="speech.mp3"
        )
        
    except Exception as e:
        print(f"TTS Error: {e}")
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True)
