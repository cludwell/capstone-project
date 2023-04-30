from flask import Blueprint, jsonify, request, redirect
from app.models import Album, User, Cart, db, Band, Purchase
from flask_login import current_user, login_required
from .router_helpers import get_album_info, get_band_info, get_user_info
from app.forms import PurchaseForm
purchase_routes = Blueprint('/purchase_routes', __name__)

@purchase_routes.route('/user')
def get_user_purchases():
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

@purchase_routes.route('/', methods=['GET', 'POST'])
def root_purchases():
    """returns all purchases users have made for use of landing promotions or allows a user to post a new purchase"""
    if request.method == 'GET':
        sales = Purchase.query.order_by(Purchase.created_at).all()
        copy = [s.to_dict() for s in sales]
        for p in copy:
            p['Album'] = get_album_info(p['albumId'])
            p['Band'] = get_band_info(p['Album']['bandId'])
            p['User'] =get_user_info(p['userId'])
        return copy
    if request.method == 'POST':
        if not current_user:
            return {"error": "You are not authorized for this request"}
        form = PurchaseForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.validate_on_submit():
            return form.errors, 404
        else:
            new_purchase = Purchase(
                user_id = current_user.id,
                album_id = form.data['album_id'],
                price = form.data['price']
            )
            db.session.add(new_purchase)
            db.session.commit()
            copy = new_purchase.to_dict()
            copy['Album'] = get_album_info(copy['albumId'])
            copy['Band'] = get_band_info(copy['Album']['bandId'])
            return copy, 200
