from app.models import Album, Cart, WishList, Band

def get_album_info(album_id):
    """get album info for user"""
    album = Album.query.get(album_id)
    return album.to_dict()

def get_band_info(band_id):
    """get band info for the user"""
    band = Band.query.get(band_id)
    return band.to_dict()
