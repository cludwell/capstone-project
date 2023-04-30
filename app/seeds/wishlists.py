from app.models import db, WishList, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wishlists():
    wishlist001 = WishList(
        user_id=2, album_id=1
    )
    wishlist002 = WishList(
        user_id=2, album_id=2
    )
    wishlist003 = WishList(
        user_id=2, album_id=3
    )
    wishlist004 = WishList(
        user_id=2, album_id=5
    )
    wishlist005 = WishList(
        user_id=2, album_id=6
    )
    wishlist006 = WishList(
        user_id=3, album_id=2
    )
    wishlist007 = WishList(
        user_id=3, album_id=3
    )
    wishlist008 = WishList(
        user_id=3, album_id=4
    )
    wishlist009 = WishList(
        user_id=3, album_id=5
    )
    wishlist010 = WishList(
        user_id=1, album_id=6
    )
    wishlist010 = WishList(
        user_id=1, album_id=7
    )
    wishlist010 = WishList(
        user_id=1, album_id=8
    )
    wishlist010 = WishList(
        user_id=1, album_id=9
    )
    wishlist010 = WishList(
        user_id=1, album_id=10
    )
    wishlist010 = WishList(
        user_id=1, album_id=11
    )
    db.session.add_all([
        wishlist001, wishlist002, wishlist003, wishlist004, wishlist005, wishlist006, wishlist007, wishlist008, wishlist009, wishlist010
        ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wish_lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wish_lists"))

    db.session.commit()
