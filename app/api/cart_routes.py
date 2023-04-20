from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, Cart, db
from flask_login import current_user, login_required

cart_routes = Blueprint('/carts', __name__)

@cart_routes.route('/', methods=['GET', 'DELETE'])
def get_users_cart():
    """get the logged in users cart"""
    if not current_user:
        return {"error": "Please sign in to keep track of your cart"}
    cart = Cart.query.filter(Cart.user_id == current_user.id).all()
    if request.method == 'GET':
        return [c.to_dict() for c in cart]
    if request.method == 'DELETE':
        for c in cart:
            db.session.delete(c)
        db.session.commit()
        return {"message": "Your cart has been emptied"}
