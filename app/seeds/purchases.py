from app.models import db, Purchase, environment, SCHEMA
from sqlalchemy.sql import text

def seed_purchases():

    purchase01 = Purchase(
        user_id=3, album_id=2
    )
    purchase02 = Purchase(
        user_id=3, album_id=3
    )
    purchase03 = Purchase(
        user_id=1, album_id=1
    )
    purchase04 = Purchase(
        user_id=1, album_id=4
    )
    purchase05 = Purchase(
        user_id=1, album_id=5
    )
    purchase06 = Purchase(
        user_id=6, album_id=1
    )
    purchase07 = Purchase(
        user_id=6, album_id=2
    )
    purchase08 = Purchase(
        user_id=6, album_id=3
    )
    purchase09 = Purchase(
        user_id=6, album_id=5
    )
    purchase10 = Purchase(
        user_id=6, album_id=6
    )
    purchase11 = Purchase(
        user_id=6, album_id=7
    )
    purchase12 = Purchase(
        user_id=6, album_id=9
    )
    purchase13 = Purchase(
        user_id=6, album_id=10
    )


    db.session.add_all([
        purchase01, purchase02, purchase03, purchase04, purchase05, purchase06, purchase07, purchase08, purchase09, purchase10, purchase11, purchase12, purchase13, ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_purchases():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchases"))

    db.session.commit()
