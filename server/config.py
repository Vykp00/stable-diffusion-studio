from dotenv import load_dotenv
import os
load_dotenv()

class AppConfig(object):
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "postgresql://vy:vyadmin12345@localhost/studiodb"