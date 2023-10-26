from flask import Flask, request, session, redirect, url_for
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS, cross_origin

# module
import json
from auth import db, User, Photo
from config import AppConfig

#Import HuggingFace API
from dotenv import load_dotenv
import os
import requests
import io
from PIL import Image
import base64

#Import Azure Blob Storage for image
import uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
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
    
#Get token
apiKey = os.environ['SDAPI_TOKEN']
headers = {"Authorization": f'Bearer {apiKey}'}

API_URL_1 = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"
API_URL_2 = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"
API_URL_3 = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"

# Retrieve Container Client to store images
connect_str = os.environ['AZURE_STORAGE_CONNECTION_STRING'] # retrieve the connection string from the environment variable
container_name = "generatedimages" # container name in which images will be store in the storage account

blob_service_client = BlobServiceClient.from_connection_string(conn_str=connect_str) # create a blob service client to interact with the storage account
try:
    container_client = blob_service_client.get_container_client(container=container_name) # get container client to interact with the container in which images will be stored
    container_client.get_container_properties() # get properties of the container to force exception to be thrown if container does not exist
except Exception as e:
    container_client = blob_service_client.create_container(container_name) # create a container in the storage account if it does not exist
# POST prompt to selected api and return image
def query(payload, apiURL):
    try:
        response = requests.post(apiURL, headers=headers, json=payload)
        return response.content
    
    # Catch errors
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)})

@app.route("/")
def hello_world():
    return 'Hello World!'

@app.route("/auth")
# Get generated image
@app.route("/model", methods = ["GET", "POST"])
def get_output_image():
    prompt = request.json["prompt"]
    api = request.json["api"]
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    
    if not prompt:
        return jsonify({"error": "Query is required"})
    
    payload = {"inputs": f'{prompt}',}

    if api == "stable-diffusion-2-1":
        image_bytes = query(payload, apiURL=API_URL_1)
        
    elif api == "stable-diffusion-v1-5":
        image_bytes = query(payload, apiURL=API_URL_2)

    elif api == "stable-diffusion-xl-base-1.0":
        image_bytes = query(payload, apiURL=API_URL_3)
    else:
        return jsonify({'error': 'Invalid API choice'})
    
    #Create unique id for image name
    image_name = str(uuid.uuid4())
    image = io.BytesIO(image_bytes)
    # Upload image to Storage Container
    try:
        container_client.upload_blob(image_name, image)
    except Exception as e:
        print(e)
        print("Ignore duplicate filenames") # Ignore duplicate filenames

    # Save image credential to database
    try:
        blob_client = container_client.get_blob_client(blob=image_name)
        img_html = blob_client.url
        new_image = Photo(title=image_name, prompt=prompt, url=img_html, user_id=user.id)
        db.session.add(new_image)
        db.session.commit()
    except Exception as e:
        print(e)

    return jsonify ({
        "id": new_image.id,
        "url": new_image.url
    })

    

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
@app.route("/auth/signup", methods=["POST"])
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
@app.route("/auth/login", methods=["GET", "POST"])
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
@app.route("/auth/signout", methods=["POST"])
def signout():
   # remove the username from the session if it is there
   session.pop("user_id", None)
   return "200"

# Running app
if __name__ == '__main__':
    app.run(debug=True)