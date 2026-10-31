from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests coming from the Express frontend

@app.route("/")
def health():
    return jsonify(status="Flask backend is running")

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json(silent=True) or request.form
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify(success=False, error="All fields are required"), 400

    # "Process" the data
    processed = {
        "name": name.title(),
        "email": email.lower(),
        "message": message,
        "message_length": len(message),
        "word_count": len(message.split()),
    }
    return jsonify(success=True, reply=f"Hello {processed['name']}, your message was received!", data=processed)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
