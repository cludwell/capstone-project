from flask import Blueprint, jsonify, request, redirect
from app.models import Album, Song, Purchase, User, Band, db
from flask_login import current_user, login_required
from app.forms import PostBandForm
band_routes = Blueprint('/bands', __name__)

def get_albums_by_band(band_id):
    """helper to get all of a bands albums"""
    discog = Album.query.filter(Album.band_id== band_id).all()
    return  [a.to_dict() for a in discog]

@band_routes.route('/<int:band_id>', methods=['GET', 'DELETE', 'PUT'])
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
        if current_user == None or current_user.id != band.user_id:
            return {"error": "You are not authorized to delete this item"}
        else:
            # return band.to_dict()
            db.session.delete(band)
            db.session.commit()
            return band.to_dict()
    if request.method == 'PUT':
        if current_user.id == band.user_id:
            form = PostBandForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                band.name = form.data['name']
                band.city = form.data['city']
                band.state = form.data['state']
                band.country = form.data['country']
                band.artist_image = form.data['artist_image']
                band.banner_url = form.data['banner_url']
                band.description = form.data['description']
                band.genres = form.data['genres']
                band.user_id = current_user.id
                db.session.commit()
                return band.to_dict(), 201
        else:
            return {"error": "Unauthorized request"}, 401



@band_routes.route('/', methods=['POST', 'GET'])
def post_band():
    """post a band"""
    if request.method == 'GET':
        bands = Band.query().all()
        return {b.id: b.to_dict() for b in bands}, 200
    if request.method == 'POST' and current_user.id:
        form = PostBandForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form.validate_on_submit()
        if not form.validate_on_submit():
            return form.errors, 404
        if form.validate_on_submit():
            new_band = Band(
                name = form.data['name'],
                city = form.data['city'],
                state = form.data['state'],
                country = form.data['country'],
                artist_image = form.data['artist_image'],
                banner_url = form.data['banner_url'],
                description = form.data['description'],
                genres = form.data['genres'],
                user_id = current_user.id,
            )
            db.session.add(new_band)
            db.session.commit()
            return new_band.to_dict(), 201
    else:
        return {"errors": "You must be validated"}
