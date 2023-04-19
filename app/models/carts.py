from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'albumId': self.album_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
