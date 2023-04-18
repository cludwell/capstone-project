from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func

class Band(db.Model):
    __tablename__ = 'bands'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    artist_image = db.Column(db.Integer, nullable=True)
    band_url = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text)
    genres = db.String(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'userId': self.user_id,
            'artistImage': self.artist_image,
            'bandUrl': self.band_url,
            'genres': self.genres,
            'bannerUrl': self.banner_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
