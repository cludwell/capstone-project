from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from .router_helpers import get_album_info, get_user_wishlist, get_user_buys
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # users = User.query.all()
    # return {'users': [user.to_dict() for user in users]}
    users = User.query.all()
    copy = {u.id: u.to_dict() for u in users}
    for c in copy:
        c['Purchases'] = get_user_buys(c['id'])
        c['Purchases']['Album'] = get_album_info(c['Purchases']['albumId'])
        c['WishList'] = get_user_wishlist(c['id'])
        c['WishList']['Album'] = get_album_info(c['WishList']['Album']['albumId'])
    return copy, 200



@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
