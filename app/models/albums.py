from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Integer)
    band_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    album_image = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    shopped_by = db.relationship('User', backref='in_progress', secondary='carts', lazy='dynamic')
    supported_by = db.relationship('User', backref='supporting_users', secondary='purchases', lazy=True)
    wishing_users = db.relationship('User', backref='wished_albums', secondary='wish_lists')
    songs = db.relationship('Song', backref='albums', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'bandId': self.band_id,
            'albumImage': self.album_image,
            'genre': self.genre,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
