from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Purchases(db.Model):
    __tablename__ = 'purchases'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums')))
    price = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'itemId': self.item_id,
            'price': self.price,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
