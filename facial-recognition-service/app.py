import os
import face_recognition
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

# This is a very simple in-memory store for demonstration.
# In a real app, you would get the stored_encoding from your database.
ENCODINGS_DB = {} 

@app.route('/')
def index():
    return "Facial Recognition Service is running."

@app.route('/encode', methods=['POST'])
def encode_face():
    """
    Takes an image file, finds the face, and returns its 128-d encoding.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        image = Image.open(file.stream).convert("RGB")
        image_np = np.array(image)
        
        face_locations = face_recognition.face_locations(image_np)
        if not face_locations:
            return jsonify({"error": "No face found in the image"}), 400
            
        face_encodings = face_recognition.face_encodings(image_np, face_locations)
        
        # Return the first found face encoding
        encoding = face_encodings[0].tolist() # Convert numpy array to list for JSON
        
        return jsonify({"encoding": encoding}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/verify', methods=['POST'])
def verify_face():
    """
    Takes a live image and a student's stored encoding, and verifies if they match.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part for live image"}), 400
    
    data = request.form
    if 'stored_encoding' not in data:
        return jsonify({"error": "Missing stored_encoding"}), 400

    try:
        stored_encoding_str = data['stored_encoding']
        # Convert the string representation of the list back to a numpy array
        stored_encoding = np.array(eval(stored_encoding_str))

        live_image_file = request.files['file']
        live_image = Image.open(live_image_file.stream).convert("RGB")
        live_image_np = np.array(live_image)

        live_face_locations = face_recognition.face_locations(live_image_np)
        if not live_face_locations:
            return jsonify({"error": "No face found in the live image"}), 400

        live_face_encodings = face_recognition.face_encodings(live_image_np, live_face_locations)
        live_encoding = live_face_encodings[0]
        
        # Compare the live encoding with the stored encoding
        matches = face_recognition.compare_faces([stored_encoding], live_encoding, tolerance=0.6)
        
        is_match = bool(matches[0])

        return jsonify({"is_match": is_match}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
