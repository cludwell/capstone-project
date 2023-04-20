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

@cart_routes.route('/<int:cart_id>', methods=['DELETE'])
def remove_from_cart(cart_id):
    """removes an item from the users cart"""
    cart_item = Cart.query.get(cart_id)
    if not cart_item:
        return {"error": "The requested record couldn't be found"}
    if current_user.id != cart_item.user_id:
        return {"error": "Unauthorized request"}
    db.session.delete(cart_item)
    db.session.commit()
    return cart_item.to_dict()
