from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, WishList, db
from flask_login import current_user, login_required

wishlist_routes = Blueprint('/wishlists', __name__)

@wishlist_routes.route('/', methods=['GET', 'DELETE'])
def get_wishlist():
    """get logged in users wishlists"""
    if not current_user:
        return {"error": "Please sign in to keep track of your wishlist"}
    wishlist = WishList.query.filter(WishList.user_id == current_user.id).all()
    if request.method == 'GET':
        return [w.to_dict() for w in wishlist]
    if request.method =='DELETE':
        for i in wishlist:
            db.session.delete(i)
        db.session.commit()
        return {"message": "Your wishlist has been cleared"}

@wishlist_routes.route('/<int:wishlist_id>', methods=['DELETE'])
def delete_from_wishlist(wishlist_id):
    """remove a single item from a wishlist"""
    item = WishList.query.get(wishlist_id)
    if not current_user or current_user.id:
        return {"error": "Unauthorized request"}
    if not item:
        return {"error": "The requested record could not be found"}
    return item.to_dict()
