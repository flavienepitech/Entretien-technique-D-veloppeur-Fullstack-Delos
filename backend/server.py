import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests

app = Flask(__name__)

API_KEY_1=os.getenv("API_KEY_1")
API_KEY_2="api_key_2"

PROVIDER_1_URL=os.getenv("PROVIDER_1_URL")
PROVIDER_2_URL="api_provider_url_2"

def chatbot_response(user_input, api_key, provider_url):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        'model': 'gpt-4o',
        'messages': [{'role': 'user', 'content': user_input}]
    }
    response = requests.post(provider_url, json=data, headers=headers)

    if response.status_code == 200:
        print(response.json())
        return response.json().get("response", "No response from API.")
    else:
        return f"Error: {response.status_code}"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    api_key = API_KEY_1
    provider_url = PROVIDER_1_URL

    response = chatbot_response(user_message, api_key, provider_url)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
