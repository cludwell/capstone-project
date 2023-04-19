from flask import Blueprint, jsonify, request, redirect
from app.models import Album, Song, Purchase, User, Band
from flask_login import current_user, login_required

band_routes = Blueprint('/bands', __name__)

def get_albums_by_band(band_id):
    """helper to get all of a bands albums"""
    discog = Album.query.filter_by(band_id==band_id)
    return {a.to_dict() for a in discog}

@band_routes.route('/<int:band_id>')
def bands_albums(band_id):
    """get all of a bands albums"""
    band = Band.query.get(band_id)
    copy = band.to_dict()
    copy['Albums'] = get_albums_by_band(band.id)
