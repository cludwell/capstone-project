from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func

class Band(db.Model):
    __tablename__ = 'bands'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    artist_image = db.Column(db.String)
    banner_url = db.Column(db.String)
    description = db.Column(db.Text)
    genres = db.Column(db.String(255))
    background_image = db.Column(db.String)
    tiled = db.Column(db.Boolean, default=False)
    background_color = db.Column(db.String)
    background_color_secondary = db.Column(db.String)
    text_color = db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    albums = db.relationship('Album', backref='bands', lazy=True, cascade='all, delete')
    # users = db.relationship('User', back_populates='bands', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'userId': self.user_id,
            'artistImage': self.artist_image,
            'bannerUrl': self.banner_url,
            'description': self.description,
            'genres': self.genres,
            'bannerUrl': self.banner_url,
            'backgroundImage': self.background_image,
            'tiled': self.tiled,
            'backgroundColor': self.background_color,
            'backgroundColorSecondary': self.background_color_secondary,
            'textColor': self.text_color,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
