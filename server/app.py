from flask import Flask, request, session
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS, cross_origin

# module
import json
from auth import db, User
from config import AppConfig

#Import HuggingFace API
from dotenv import load_dotenv
import os
import requests
from io import BytesIO
from PIL import Image
import base64

load_dotenv()

# Initializing flask app
#Set database
app = Flask(__name__)
app.config.from_object(AppConfig)

cors= CORS(app, supports_credentials=True) #cross-site request
bcrypt = Bcrypt(app) #Hash password
#server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#Get models
API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"
apiKey = "Bearer " + os.environ["SDAPI_TOKEN"]
headers = {"Authorization": apiKey}

# POST API prompt
def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content

@app.route("/")
def hello_world():
    return 'Hello World!'

@app.route("/model", methods = ["GET", "POST"])
def get_output_image():
    #inputs = request.json["inputs"]
    image_bytes = query({
	"inputs": "a blue bird",
})
    # Encode the image bytes as base64
    image_base64 = base64.b64encode(image_bytes).decode('utf-8')

    # Return the base64-encoded image data
    return jsonify({"image":image_base64})

# Return user info
@app.route('/@me')
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id" : user.id,
        "email": user.email
    })

# Sign up
@app.route("/signup", methods=["POST"])
def register_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user_exists =User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exits"}), 409
    
    # Set decoded password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') 
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "id" : new_user.id,
        "email": new_user.email
    })

# Login
@app.route("/login", methods=["GET", "POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user =User.query.filter_by(email=email).first()

    #Check if user exist
    if user is None:
        return jsonify({"error": "Unauthorized, user does not exits"}), 401
    
    # If password doesn't match
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Password is incorrect"}), 401
    
    # Secure client side id
    session["user_id"] = str(user.id)
    
    return jsonify({
        "id" : user.id,
        "email": user.email
    })
# Route for seeing a demo data
@app.route("/signout", methods=["POST"])
def signout():
   # remove the username from the session if it is there
   session.pop("user_id", None)
   return "200"

# Running app
if __name__ == '__main__':
    app.run(debug=True)