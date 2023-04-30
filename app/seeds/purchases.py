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
    purchase14 = Purchase(
        # matthew corry, singer of fellowship album 6
        user_id=5, album_id=1
    )
    purchase15 = Purchase(
        # matthew corry, singer of fellowship album 6
        user_id=5, album_id=2
    )
    purchase16 = Purchase(
        # matthew corry, singer of fellowship album 6
        user_id=5, album_id=3
    )
    purchase17 = Purchase(
        # matthew corry, singer of fellowship album 6
        user_id=5, album_id=4
    )
    purchase18 = Purchase(
        # matthew corry, singer of fellowship album 6
        user_id=5, album_id=10
    )
    purchase19 = Purchase(
        # matthew corry, singer of fellowship album 6
        user_id=5, album_id=9
    )
    purchase20 = Purchase(
        # accidente
        user_id=2, album_id=2
    )
    purchase21 = Purchase(
        # accidente
        user_id=2, album_id=10
    )
    purchase22 = Purchase(
        # accidente
        user_id=2, album_id=3
    )
    purchase23 = Purchase(
        # accidente
        user_id=2, album_id=15
    )
    purchase24 = Purchase(
        # accidente
        user_id=2, album_id=14
    )
    purchase25 = Purchase(
        # accidente
        user_id=2, album_id=9
    )
    purchase26 = Purchase(
        # henry rollins
        user_id=3, album_id=10
    )
    purchase27 = Purchase(
        # henry rollins
        user_id=3, album_id=11
    )
    purchase28 = Purchase(
        # henry rollins
        user_id=3, album_id=12
    )
    purchase29 = Purchase(
        # henry rollins
        user_id=3, album_id=13
    )
    purchase30 = Purchase(
        # henry rollins
        user_id=3, album_id=14
    )
    purchase31 = Purchase(
        # henry rollins
        user_id=3, album_id=15
    )
    purchase32 = Purchase(
        # melissa bonnie
        user_id=4, album_id=6
    )
    purchase33 = Purchase(
        # melissa bonnie
        user_id=4, album_id=7
    )
    purchase34 = Purchase(
        # melissa bonnie
        user_id=4, album_id=8
    )
    purchase35 = Purchase(
        # melissa bonnie
        user_id=4, album_id=9
    )
    purchase36 = Purchase(
        # melissa bonnie
        user_id=4, album_id=10
    )
    purchase37 = Purchase(
        # melissa bonnie
        user_id=4, album_id=11
    )

    db.session.add_all([
        purchase01, purchase02, purchase03, purchase04, purchase05, purchase06, purchase07, purchase08, purchase09, purchase10, purchase11, purchase12, purchase13, purchase14, purchase15, purchase16, purchase17, purchase18, purchase19, purchase20, purchase21, purchase22, purchase23, purchase24, purchase25, purchase26, purchase27, purchase28, purchase29, purchase30, purchase31, purchase32, purchase33, purchase34, purchase35, purchase36, purchase37 ])
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
