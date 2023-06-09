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
    band_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("bands.id")), nullable=False)
    album_image = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    youtube = db.Column(db.String(255))

    wish_lists = db.relationship('WishList', backref='albums', lazy=True, cascade='all, delete')
    carts = db.relationship('Cart', backref='albums', lazy=True, cascade='all, delete')
    purchases = db.relationship('Purchase', backref='albums', lazy=True, cascade='all, delete')
    songs = db.relationship('Song', backref='albums', lazy=True, cascade='all, delete')

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
            'updatedAt': self.updated_at,
            'youtube': self.youtube
        }
