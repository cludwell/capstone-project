from flask import Blueprint, jsonify, request, redirect
from app.models import Album, Song, Purchase, User, Band, db
from flask_login import current_user, login_required

band_routes = Blueprint('/bands', __name__)

def get_albums_by_band(band_id):
    """helper to get all of a bands albums"""
    discog = Album.query.filter(Album.band_id== band_id).all()
    return  [a.to_dict() for a in discog]

@band_routes.route('/<int:band_id>', methods=['GET', 'DELETE'])
def bands_albums(band_id):
    """get all band info by id"""
    band = Band.query.get(band_id)
    if not band:
        return {"error": "The requested band could not be found"}
    if request.method == 'GET':
        copy = band.to_dict()
        copy['Albums'] = get_albums_by_band(band.id)
        return copy
    if request.method =='DELETE':
        if current_user == None or current_user.id !=band.user_id:
            return {"error": "You are not authorized to delete this item"}
        else:
            # return band.to_dict()
            db.session.delete(band)
            db.session.commit()
            return band.to_dict()
