from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, Cart, db, Band, Purchase
from flask_login import current_user, login_required
from .router_helpers import get_album_info, get_band_info

purchase_routes = Blueprint('/purchase_routes', __name__)

@purchase_routes.route('/')
def get_purchases():
    """get all of users purchases for collections page"""
    if not current_user:
        return {"error": "Please sign in to keep track of your purchases"}
    purchases = Purchase.query.filter(Purchase.user_id==current_user.id).all()
    if request.method == 'GET':
        copy = [p.to_dict() for p in purchases]
        for p in copy:
            p['Album'] = get_album_info(p['albumId'])
            p['Band'] = get_band_info(p['Album']['bandId'])
        return copy