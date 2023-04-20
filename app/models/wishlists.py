from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class WishList(db.Model):
    __tablename__ = 'wish_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # albums = db.relationship('Album', backref='wish_lists', lazy=True)
    users = db.relationship('User', back_populates='wish_lists')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'albumId': self.album_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

# wish_lists = db.Table(
#     'wish_lists',
#     db.Model.metadata,
#     db.Column('id', db.Integer, primary_key = True),
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
#     db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id'))),
#     db.Column('created_at', db.DateTime(timezone=True), server_default=func.now()),
#     db.Column('updated_at', db.DateTime(timezone=True), onupdate=func.now())
# )
