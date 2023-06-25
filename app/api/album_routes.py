from flask import Blueprint, jsonify, request, redirect
from app.models import db, Album, Song, Purchase, User, Band
from flask_login import current_user, login_required
from .router_helpers import get_sales, get_sale_user, get_album_songs, get_band_info
from app.forms import PostAlbumForm, PostSongForm
from app.api.aws_helpers import (upload_file_to_s3, allowed_file, allowed_song, get_unique_filename, delete_file_from_s3)
import traceback

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
            # aws album image
            if 'album_image' not in request.files:
                return { 'errors': ['Album image is required' ] }, 400
            album_image = request.files['album_image']
            if not allowed_file(album_image.filename):
                return {'errors': ['file type not permitted']}, 400
            album_image.filename = get_unique_filename(album_image.filename)
            album_image_upload = upload_file_to_s3(album_image)
            if 'url' not in album_image_upload:
                return album_image_upload, 400
            album_image_aws_url = album_image_upload['url']
            # end of aws album image
            new_album = Album(
                name = form.data['name'],
                description = form.data['description'],
                price = form.data['price'],
                album_image = album_image_aws_url,
                genre = form.data['genre'],
                band_id = form.data['band_id'],
                youtube = form.data['youtube']
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
        payload = album.to_dict()
        payload['Band'] = band.to_dict()
        payload['Songs'] = get_album_songs(payload['id'])
        payload['Sales'] = get_sales(payload['id'])
        for s in payload['Sales']:
            s['User'] = get_sale_user(s)

        return payload
    if request.method == 'DELETE':
        if current_user == None or current_user.id != band.user_id:
            return {"error": "You are not authorized to delete this item."}
        else:
            delete_file_from_s3(album.album_image)
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
                # aws album image
                if 'album_image' not in request.files:
                    return { 'errors': ['Album image is required' ] }, 400
                album_image = request.files['album_image']
                if not allowed_file(album_image.filename):
                    return {'errors': ['file type not permitted']}, 400
                album_image.filename = get_unique_filename(album_image.filename)
                album_image_upload = upload_file_to_s3(album_image)
                delete_file_from_s3(album.album_image)
                if 'url' not in album_image_upload:
                    return album_image_upload, 400
                album_image_aws_url = album_image_upload['url']
                # end of aws album image
                album.name = form.data['name']
                album.description = form.data['description']
                album.price = form.data['price']
                album.album_image = album_image_aws_url if album_image_aws_url else album.album_image
                album.genre = form.data['genre']
                album.band_id = form.data['band_id']
                album.youtube = form.data['youtube']
                db.session.commit()
                return album.to_dict(), 201
            else:
                return {"error": "Unauthorized request."}

@album_routes.route('/<int:album_id>/songs/', methods=["POST"])
def create_song(album_id):
    """post a song according to album id"""
    if request.method == 'POST' and current_user.id:
        album = Album.query.get(album_id)
        band = Band.query.get(album.band_id)
        if current_user.id != band.user_id:
            return {"error": "Unauthorized request"}
        else:
            form = PostSongForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            # aws song upload
            if request.files['url']:
                url = request.files['url']
                if not allowed_song(url.filename):
                    return { 'errors': ['file type not permitted'] }, 400
                url.filename = get_unique_filename(url.filename)
                url_upload = upload_file_to_s3(url)
                aws_url = url_upload['url']
            # end of aws upload

            if form.validate_on_submit():
                new_song = Song(
                    name = form.data['name'],
                    lyrics = form.data['lyrics'],
                    price = form.data['price'],
                    track_num = form.data['track_num'],
                    url = aws_url or form.data['url'],
                    album_id = album_id
                )
            db.session.add(new_song)
            db.session.commit()
            return new_song.to_dict(), 201

@album_routes.route('/<int:album_id>/songs/<int:song_id>', methods=['PUT'])
def edit_or_delete_song(album_id, song_id):
    """edit or delete song by id"""
    song = Song.query.get(song_id)
    album = Album.query.get(album_id)
    band = Band.query.get(album.band_id)

# and current_user.id == band.user_id
    if request.method == 'PUT':
        form = PostSongForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.validate_on_submit():
            print('FORM ERRORS', form.errors)
        if form.validate_on_submit():

        # aws song upload
            aws_url = None  # Initialize aws_url variable with None
            if 'url' in request.files:
                if song.url:
                    delete_file_from_s3(song.url)
                url = request.files['url']
                if not allowed_song(url.filename):
                    return { 'errors': ['file type not permitted'] }, 400

                url.filename = get_unique_filename(url.filename)
                url_upload = upload_file_to_s3(url)
                aws_url = url_upload.get('url')
        # end of aws upload

            song.name = form.data['name']
            song.lyrics = form.data['lyrics']
            song.price = form.data['price']
            song.track_num = form.data['track_num']
            song.url = aws_url if aws_url else song.url
            song.album_id = album_id

            try:
                db.session.commit()
                return song.to_dict()
            except Exception as e:
                traceback.print_exc()  # Print the traceback
                return {'error': str(e)}, 500

    return {'error': 'Unauthorized request'}, 404
