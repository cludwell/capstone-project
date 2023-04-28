from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
    cart01 = Cart(
        user_id=1, album_id=6
    )
    cart02 = Cart(
        user_id=3, album_id=4
    )
    cart03 = Cart(
        user_id=3, album_id=5
    )
    cart04 = Cart(
        user_id=1, album_id=10
    )
    cart05 = Cart(
        user_id=1, album_id=11
    )
    cart06 = Cart(
        user_id=1, album_id=13
    )
    cart07 = Cart(
        user_id=1, album_id=14
    )


    db.session.add_all([
        cart01, cart02, cart03,cart04, cart05, cart06, cart07
        
        ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
