from app.models import db, WishList, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wishlists():
    wishlist01 = WishList(
        user_id=1, item_id=1
    )
    wishlist02 = WishList(
        user_id=1, item_id=2
    )
    wishlist03 = WishList(
        user_id=1, item_id=3
    )

    db.session.add_all([
        wishlist01, wishlist02, wishlist03])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlists"))

    db.session.commit()
