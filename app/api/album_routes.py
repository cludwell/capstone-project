from flask import Blueprint, jsonify, request, redirect
from app.models import Album, Song, Purchase, User
from flask_login import current_user, login_required

album_routes = Blueprint('/albums', __name__)

def get_album_songs(album_id):
    songs = Song.query.filter(Song.album_id==album_id).all()
    # print('===================', songs.to_dict())
    return [s.to_dict() for s in songs]

def get_sales(album_id):
    sales = Purchase.query.filter(Purchase.album_id == album_id).all()
    copy = [s.to_dict() for s in sales]
    return copy

def get_sale_user(sale):
    user = User.query.get(sale['userId'])
    return user.to_dict()

@album_routes.route('/')
def get_all_albums():
    """returns a list of all albums in the database, will be useful for landing page"""
    if request.method == 'GET':
        albums = Album.query.all()
        discog = { a.id: a.to_dict() for a in albums}
        for a in discog:
            discog[a]['Songs'] = get_album_songs(a)
            discog[a]['Sales'] = get_sales(a)
            for s in discog[a]['Sales']:
                s['User'] = get_sale_user(s)
                del s['User']['address']
        return discog

@album_routes.route('/<int:album_id>', methods=['GET'])
def get_album_by_id(album_id):
    """return album details for use on album page"""
    album = Album.query.get(album_id)
    copy = album.to_dict()
    copy['Songs'] = get_album_songs(copy['id'])
    copy['Sales'] = get_sales(copy['id'])
    for s in copy['Sales']:
        s['User'] = get_sale_user(s)
    return copy

# @album_routes.route('/', methods=['POST'])
# @login_required
# def post_album():
#     """route that allows a band to post their album to server"""
