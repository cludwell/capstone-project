from app.models import Album, Cart, WishList, Band, Song, Purchase, User

def get_album_info(album_id):
    """get album info for user"""
    album = Album.query.get(album_id)
    return album.to_dict()

def get_band_info(band_id):
    """get band info for the user"""
    band = Band.query.get(band_id)
    return band.to_dict()

def get_album_songs(album_id):
    songs = Song.query.filter(Song.album_id==album_id).all()
    return [s.to_dict() for s in songs]

def get_sales(album_id):
    sales = Purchase.query.filter(Purchase.album_id == album_id).all()
    return [s.to_dict() for s in sales]

def get_sale_user(sale):
    user = User.query.get(sale['userId'])
    return user.to_dict()

def get_user_info(user_id):
    user = User.query.get(user_id)
    return user.to_dict()
