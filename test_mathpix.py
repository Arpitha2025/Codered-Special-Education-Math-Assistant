import os
import requests
from dotenv import load_dotenv

load_dotenv()

# Test credentials
app_id = os.getenv("MATHPIX_APP_ID")
app_key = os.getenv("MATHPIX_APP_KEY")

print(f"Testing Mathpix API...")
print(f"APP_ID: {app_id[:10]}..." if app_id else "APP_ID: MISSING")
print(f"APP_KEY: {app_key[:10]}..." if app_key else "APP_KEY: MISSING")

# Test with a simple request
url = "https://api.mathpix.com/v3/text"
headers = {
    "app_id": app_id,
    "app_key": app_key
}

# Test file path - replace with your actual PDF path
test_file_path = "your_test_file.pdf"

try:
    with open(test_file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(url, headers=headers, files=files, timeout=30)
        
    print(f"\nStatus Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
except FileNotFoundError:
    print(f"\nError: Test file '{test_file_path}' not found")
    print("Please create a simple PDF and update the test_file_path variable")
except Exception as e:
    print(f"\nError: {e}")
