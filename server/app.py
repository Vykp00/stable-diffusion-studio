from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask.json import jsonify

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

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'Hey!'

# Sign up
@app.route('/signup', methods=['POST'])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists =User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exits"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "id" : new_user.id,
        "email": new_user.email
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
    app.run(debug=True)