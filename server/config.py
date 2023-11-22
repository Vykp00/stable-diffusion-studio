from dotenv import load_dotenv
import os
import redis

load_dotenv()

class AppConfig(object):
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = os.environ["SQLALCHEMY_DATABASE_URI"]
    # SQLALCHEMY_DATABASE_URI = "postgresql://vy:vyadmin12345@localhost/studiodb"

    # Set Flask Session
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(os.environ["SESSION_REDIS"])
    #My local redis
    #SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")