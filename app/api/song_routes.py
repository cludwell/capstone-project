from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, Band, db, Song
from flask_login import current_user, login_required

song_routes = Blueprint('/songs', __name__)
