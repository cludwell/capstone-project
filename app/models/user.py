from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from .albums import Album

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255))
    profile_pic = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # cart = db.relationship('Cart',
    #     back_populates='users',
    #     lazy='dynamic')
    # purchased_albums = db.relationship('Album',
    #     back_populates='purchases',
    #     secondary=supporters,
    #     lazy=True)
    # wished_for_albums = db.relationship('Album',
    #     back_populates='wish_lists',
        # secondary=wished_for,
        # lazy='dynamic')
    carts = db.relationship('Cart', backref='users', lazy=True)
    wish_lists = db.relationship('WishList', back_populates='wish_lists', lazy=True)
    purchases = db.relationship('Purchase', backref='users', lazy=True)
    bands = db.relationship('Band',
        backref='users', lazy=True, cascade="all, delete")

    # albums_released = db.relationship('Album', backref='users_releases', secondary='bands')
    # wished_for_albums = db.relationship('Album', backref='wished_by_users', secondary='wish_lists', lazy='dynamic')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'genre': self.genre,
            'profilePic': self.profile_pic,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
