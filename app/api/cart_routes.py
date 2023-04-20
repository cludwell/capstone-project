from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, Cart
from flask_login import current_user, login_required

cart_routes = Blueprint('/carts', __name__)

@cart_routes.route('/')
def get_users_cart():
    """get the logged in users cart"""
    print('==============================',  current_user)
    cart = Cart.query.filter(Cart.user_id == current_user.id).all()
    return [c.to_dict() for c in cart]
