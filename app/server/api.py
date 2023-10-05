from flask import Flask

app = Flask(__name__)

@app.route('/helloworld')
def hello_world():
    response_body = {
        "name": "AI",
        "about" :"Hello World! I'm an AI model"
    }

    return response_body