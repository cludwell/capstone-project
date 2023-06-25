from flask import Blueprint, jsonify, request, redirect
from app.models import Album, Song, Purchase, User, Band, db
from flask_login import current_user, login_required
from app.forms import PostBandForm
from app.api.aws_helpers import (upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)
from flask import request
import traceback

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
        payload = band.to_dict()
        payload['Albums'] = get_albums_by_band(band.id)
        return payload

    if request.method =='DELETE':
        if current_user == None or current_user.id != band.user_id:
            return {"error": "You are not authorized to delete this item"}
        else:
            # return band.to_dict()
            if band.background_image:
                delete_file_from_s3(band.background_image)
            delete_file_from_s3(band.banner_url)
            delete_file_from_s3(band.artist_image)
            db.session.delete(band)
            db.session.commit()
            return band.to_dict()

    if request.method == 'PUT':
        if current_user.id == band.user_id:
            form = PostBandForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            # AWS Image management
            if 'banner_url' not in request.files:
                return { 'errors': ['Banner Image is required']}, 400
            if 'artist_image' not in request.files:
                return { 'errors': ['Band photo is required']}, 400
            banner_url = request.files['banner_url']
            artist_image = request.files['artist_image']
            background_image = request.files['background_image']
            if not allowed_file(banner_url.filename) or not allowed_file(artist_image.filename):
                return {'errors': ['file type not permitted']}, 400
            banner_url.filename = get_unique_filename(banner_url.filename)
            artist_image.filename = get_unique_filename(artist_image.filename)
            banner_upload = upload_file_to_s3(banner_url)
            artist_upload = upload_file_to_s3(artist_image)
            # background image is optional, therefore conditional
            background_image_aws = None
            if background_image:
                if not allowed_file(background_image.filename):
                    return { 'errors': ['file type not permitted']}, 400
                if band.background_image:
                    delete_file_from_s3(band.background_image)
                background_image.filename = get_unique_filename(background_image.filename)
                background_image_upload = upload_file_to_s3(background_image)
                if 'url' not in background_image_upload:
                    return background_image_upload, 400
                background_image_aws = background_image_upload['url']

            delete_file_from_s3(band.banner_url)
            delete_file_from_s3(band.artist_image)
            if 'url' not in banner_upload:
                return banner_upload, 400
            if 'url' not in artist_upload:
                return artist_upload, 400
            banner_aws_url = banner_upload['url']
            artist_aws_url = artist_upload['url']
            if form.validate_on_submit():
                band.name = form.data['name']
                band.city = form.data['city']
                band.state = form.data['state']
                band.country = form.data['country']
                band.artist_image = artist_aws_url
                band.banner_url = banner_aws_url
                band.description = form.data['description']
                band.genres = form.data['genres']
                band.background_image = background_image_aws
                band.background_color = form.data['background_color']
                band.background_color_secondary = form.data['background_color_secondary']
                band.text_color = form.data['text_color']
                band.user_id = current_user.id

            try:
                db.session.commit()
                return band.to_dict(), 201
            except Exception as e:
                traceback.print_exc()  # Print the traceback
                delete_file_from_s3(band.background_image)
                delete_file_from_s3(band.artist_image)
                delete_file_from_s3(band.banner_url)
                return {'error': str(e)}, 500
        else:
            return {"error": "Unauthorized request"}, 401



@band_routes.route('/', methods=['POST', 'GET'])
def post_band():
    """post a band"""
    if request.method == 'GET':
        bands = Band.query.all()
        return { b.id: b.to_dict() for b in bands }, 200

    if request.method == 'POST' and current_user.id:
        form = PostBandForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form.validate_on_submit()
        if not form.validate_on_submit():
            print('FORM ERRORS', form.errors)
            return form.errors, 403
        if form.validate_on_submit():
            # AWS functionality
            if 'banner_url' not in request.files:
                return { 'errors': ['Banner Image is required']}, 400
            if 'artist_image' not in request.files:
                return { 'errors': ['Band photo is required']}, 400
            banner_url = request.files['banner_url']
            artist_image = request.files['artist_image']
            background_image = request.files['background_image']
            if not allowed_file(banner_url.filename) or not allowed_file(artist_image.filename):
                return {'errors': ['file type not permitted']}, 400
            banner_url.filename = get_unique_filename(banner_url.filename)
            artist_image.filename = get_unique_filename(artist_image.filename)
            banner_upload = upload_file_to_s3(banner_url)
            artist_upload = upload_file_to_s3(artist_image)

            # background image is optional, therefore conditional
            background_image_aws = None
            if background_image:
                if not allowed_file(background_image.filename):
                    return { 'errors': ['file type not permitted']}, 400
                background_image.filename = get_unique_filename(background_image.filename)
                background_image_upload = upload_file_to_s3(background_image)
                background_image_aws = background_image_upload['url']
                if 'url' not in background_image_upload:
                    return background_image_upload, 400
            if 'url' not in banner_upload:
                return banner_upload, 400
            if 'url' not in artist_upload:
                return artist_upload, 400
            banner_aws_url = banner_upload['url']
            artist_aws_url = artist_upload['url']
            # END OF AWS
            new_band = Band(
                name = form.data['name'],
                city = form.data['city'],
                state = form.data['state'],
                country = form.data['country'],
                artist_image = artist_aws_url,
                banner_url = banner_aws_url,
                description = form.data['description'],
                genres = form.data['genres'],
                background_image = background_image_aws,
                background_color = form.data['background_color'],
                background_color_secondary = form.data['background_color_secondary'],
                text_color = form.data['text_color'],
                user_id = current_user.id,
            )

            try:
                db.session.add(new_band)
                db.session.commit()
                return new_band.to_dict(), 201
            except Exception as e:
                traceback.print_exc()  # Print the traceback
                return {'error': str(e)}, 500

    else:
        return {"errors": "You must be validated"}
