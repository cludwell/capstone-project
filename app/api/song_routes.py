from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, Band, db, Song
from flask_login import current_user, login_required
from app.api.aws_helpers import (delete_file_from_s3)

song_routes = Blueprint('/songs', __name__)

@song_routes.route('/<int:song_id>', methods=['DELETE'])
def delete_song_by_id(song_id):
    """delete song by id"""
    song = Song.query.get(song_id)
    album = Album.query.get(song.album_id)
    band = Band.query.get(album.band_id)
    if request.method == 'DELETE':
        if current_user.id != band.user_id:
            return {"error": "Unauthorized request"}, 403
        if not song:
            return {"error": "Record could not be found"}, 404
        if song.url:
            delete_file_from_s3(song.url)
        db.session.delete(song)
        db.session.commit()
        return song.to_dict()
