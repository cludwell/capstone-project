from flask import Blueprint, jsonify, request, redirect
from app.models import db, Album, Song, Purchase, User, Band
from flask_login import current_user, login_required
from .router_helpers import get_sales, get_sale_user, get_album_songs, get_band_info
from app.forms import PostAlbumForm, PostSongForm
album_routes = Blueprint('/albums', __name__)

@album_routes.route('/', methods=['GET', 'POST'])
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
    if request.method == 'POST' and current_user:
        form = PostAlbumForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.validate_on_submit():
            return form.errors, 404
        else:
            new_album = Album(
                name = form.data['name'],
                description = form.data['description'],
                price = form.data['price'],
                album_image = form.data['album_image'],
                genre = form.data['genre'],
                band_id = form.data['band_id']
            )
            db.session.add(new_album)
            db.session.commit()
            return new_album, 200

@album_routes.route('/<int:album_id>', methods=['GET', 'DELETE', 'PUT'])
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
    if request.method == 'PUT':
        if current_user == None or current_user.id != band.user_id:
            return {"error": "You are not authorized to edit this item."}
        else:
            form = PostAlbumForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                album.name = form.data['name']
                album.description = form.data['description']
                album.price = form.data['price']
                album.album_image = form.data['album_image']
                album.genre = form.data['genre']
                album.band_id = form.data['band_id']

                db.session.commit()
                return album.to_dict(), 201
            else:
                return {"error": "Unauthorized request."}

@album_routes.route('/<int:album_id>/songs', methods=["PUT"])
def create_song(album_id):
    """post a song according to album id"""
    if request.method == 'POST' and current_user.id:
        album = Album.query.get(album_id)
        band = Band.query.get(album.id)
        if current_user.id != band.user_id:
            return {"error": "Unauthorized request"}
        else:
            form = PostSongForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                new_song = Song(
                    name = form.data['name'],
                    lyrics = form.data['lyrics'],
                    price = form.data['price'],
                    track_num = form.data['track_num'],
                    url = form.data['url'],
                    album_id = album_id
                )
            db.session.add(new_song)
            db.session.commit()
            return new_song.to_dict(), 201
        
