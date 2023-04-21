from flask import Blueprint, jsonify, request, redirect
from app.models import db, Album, Song, Purchase, User, Band
from flask_login import current_user, login_required
from .router_helpers import get_sales, get_sale_user, get_album_songs, get_band_info

album_routes = Blueprint('/albums', __name__)

@album_routes.route('/')
def get_all_albums():
    """returns a list of all albums in the database, will be useful for landing page"""
    if request.method == 'GET':
        albums = Album.query.all()
        discog = { a.id: a.to_dict() for a in albums}
        for a in discog:
            discog[a]['Band'] = get_band_info(discog[a]['bandId'])
            discog[a]['Songs'] = get_album_songs(discog[a]['bandId'])
            discog[a]['Sales'] = get_sales(a)
            for s in discog[a]['Sales']:
                s['User'] = get_sale_user(s)
                del s['User']['address']
        return discog

@album_routes.route('/<int:album_id>', methods=['GET', 'DELETE'])
def get_album_by_id(album_id):
    """return album details for use on album page"""
    album = Album.query.get(album_id)
    if not album:
        return {"error": "The requested album could not be found."}
    band = Band.query.get(album.band_id)
    if request.method == 'GET':
        copy = album.to_dict()
        copy['Band'] = band.to_dict()
        copy['Songs'] = get_album_songs(copy['id'])
        copy['Sales'] = get_sales(copy['id'])
        for s in copy['Sales']:
            s['User'] = get_sale_user(s)
        return copy
    if request.method == 'DELETE':
        if current_user == None or current_user.id != band.user_id:
            return {"error": "You are not authorized to delete this item."}
        else:
            db.session.delete(album)
            db.session.commit()
            return album.to_dict()
