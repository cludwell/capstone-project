from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, WishList
from flask_login import current_user, login_required

wishlist_routes = Blueprint('/wishlists', __name__)

@wishlist_routes.route('/')
def get_wishlist():
    """get logged in users wishlists"""
    wishlist = WishList.query.filter(WishList.user_id == current_user.id).all()
    return [w.to_dict() for w in wishlist]


