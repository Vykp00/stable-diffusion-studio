from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "user_table"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password =db.Column(db.Text, nullable=False)
    photos = db.relationship("Photo", back_populates="user", cascade="all, delete-orphan")

class Photo(db.Model):
    __tablename__ = "photo_table"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    title = db.Column(db.String(36))
    prompt = db.Column(db.Text)
    url = db.Column(db.Text)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    user_id = db.Column(db.String(32), db.ForeignKey("user_table.id"))
    user = db.relationship("User", back_populates="photos")
