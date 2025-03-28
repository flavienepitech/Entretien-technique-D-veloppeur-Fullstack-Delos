import os
from flask import Flask, request, jsonify
from flask import CORS
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY_1=os.getenv("API_KEY_1")
API_KEY_2=os.getenv("API_KEY_2")

def chatbot_response(user_input, api_key):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": user_input
    }
    response = requests.post(headers=headers, json=payload)

    if response.status_code == 200:
        return response.json().get("response", "No response from API.")
    else:
        return f"Error: {response.status_code}"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    api_key = API_KEY_1

    response = chatbot_response(user_message, api_key)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
