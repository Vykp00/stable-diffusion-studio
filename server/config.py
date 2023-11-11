from dotenv import load_dotenv
import os
import redis

load_dotenv()

class AppConfig(object):
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "postgres://studiodb_x25b_user:l9UFkSHJ5d6In3GTAJi5a1g4hOPHlTav@dpg-cl7t39f6e7vc73a0mvtg-a/studiodb_x25b"
    # My Local db
    # SQLALCHEMY_DATABASE_URI = "postgresql://vy:vyadmin12345@localhost/studiodb"

    # Set Flask Session
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://red-cl7tg8v6e7vc73a0r0t0:6379")
    #My local redis
    #SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")