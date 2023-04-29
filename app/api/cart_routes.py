from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, Cart, db, Band
from flask_login import current_user, login_required
from .router_helpers import get_album_info, get_band_info
from app.forms import CartForm
cart_routes = Blueprint('/carts', __name__)


@cart_routes.route('/', methods=['GET', 'DELETE', 'POST'])
def get_users_cart():
    """get the logged in users cart"""
    if not current_user:
        return {"error": "Please sign in to keep track of your cart"}
    cart = Cart.query.filter(Cart.user_id == current_user.id).all()
    if request.method == 'GET':
        copy =[c.to_dict() for c in cart]
        for c in copy:
            c['Album'] = get_album_info(c['albumId'])
            c['Band'] = get_band_info(c['Album']['bandId'])
        return copy
    if request.method == 'DELETE':
        for c in cart:
            db.session.delete(c)
        db.session.commit()
        return {"message": "Your cart has been emptied"}
    if request.method == 'POST':
        if not current_user:
            return {"error": "You are not authorized for this request"}
        form = CartForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.validate_on_submit():
            return form.errors, 404
        else:
            new_cart = Cart(
                user_id = current_user.id,
                album_id = form.data['album_id']
            )
            db.session.add(new_cart)
            db.session.commit()
            copy = new_cart.to_dict()
            copy['Album'] = get_album_info(copy['albumId'])
            copy['Band'] = get_band_info(copy['Album']['bandId'])
            return copy, 200

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
