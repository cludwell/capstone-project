from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # users = db.relationship('User', back_populates='carts')
    # albums = db.relationship('Album', backref='carts', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'albumId': self.album_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

# carts = db.Table(
#     'carts',
#     db.Model.metadata,
#     db.Column('id', db.Integer, primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
#     db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id'))),
#     db.Column('created_at', db.DateTime(timezone=True), server_default=func.now()),
#     db.Column('updated_at', db.DateTime(timezone=True), onupdate=func.now())
# )
