from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
    lyrics = db.Column(db.Text)
    price = db.Column(db.Integer)
    track_num = db.Column(db.Integer)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'albumId': self.album_id,
            'lyrics': self.lyrics,
            'price': self.price,
            'trackNum': self.track_num,
            'url': self.url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
