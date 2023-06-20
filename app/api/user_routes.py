from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from .router_helpers import get_album_info, get_user_wishlist, get_user_buys, get_band_info


user_routes = Blueprint('users', __name__)

@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # users = User.query.all()
    # return {'users': [user.to_dict() for user in users]}
    users = User.query.all()
    copy = [ u.to_dict() for u in users]
    for c in copy:
        c['Purchases'] = get_user_buys(c['id'])
        if len(c['Purchases']) > 0:
            for p in c['Purchases']:
                p['Album'] = get_album_info(p['albumId'])
                p['Band'] = get_band_info(p['Album']['bandId'])
        c['WishList'] = get_user_wishlist(c['id'])
        if len(c['WishList']) > 0:
            for w in c['WishList']:
                w['Album'] = get_album_info(w['albumId'])
                w['Band'] = get_band_info(w['Album']['bandId'])
        del c['address']
    return {u['id']: u for u in copy}, 200



@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
