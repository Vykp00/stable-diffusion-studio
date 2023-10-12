from flask import Flask, request, session
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session

# module
import json
import datetime
from auth import db, User
from config import AppConfig
 
x = datetime.datetime.now() 

# Initializing flask app
#Set database
app = Flask(__name__)
app.config.from_object(AppConfig)

bcrypt = Bcrypt(app) #Hash password
#server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'Hey!'

# Return user infor
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
@app.route('/signup', methods=['POST'])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists =User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exits"}), 409
    
    # Set decoded password
    hashed_password = bcrypt.generate_password_hash('password').decode('utf-8') 
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "id" : new_user.id,
        "email": new_user.email
    })

# Login
@app.route("/login", methods=['GET', 'POST'])
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
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }
     
# Running app
if __name__ == '__main__':
    app.run()