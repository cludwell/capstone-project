from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user01 = User(
        username='BrittanyArchers',
        email='unleash@aa.io', password='password', name='Brittany Slayes',
        address='123 Progressive Rd', city='Vancouver', state='British Columbia', country='Canada',
        genre='metal, punk', profile_pic='https://i.imgur.com/nOUPZfs.jpg')
    user02 = User(
        username='accidente', email='blanca@aa.io', password='password', name='Blanca',
        address='123 Rainey St', city='Madrid', state='Madrid', country='Espana',
        genre='punk, pop-punk', profile_pic='https://i.imgur.com/pdcqOM2.jpg')
    user03 = User(
        username='henry', email='henryrollins@aa.io', password='password', name='Henry Rollins',
        address='2300 Nichols Canyon Rd', city='Los Angeles', state='CA', country='USA',
        genre='punk,metal', profile_pic='https://i.imgur.com/AugmhKB.jpg')
    user04 = User(
        username='melissabonnie', email='bonnie@aa.io', password='password', name='Melissa Bonnie',
        address='85 Monarch St', city='Montreux', state='Riviera-Pays-dEnhaut', country='Switzerland',
        genre='metal, opera-metal, symphonic metal', profile_pic='https://i.imgur.com/NsKW68u.jpg')
    user05 = User(
        username='fellowship', email='mcorry@aa.io', password='password', name='Matthew Corry',
        address='243 Hanover Ct', city='Harwich', state='Essex', country='UK',
        genre='metal, opera-metal, symphonic metal', profile_pic='https://i.imgur.com/BSA9XQ8.jpg')
    user06 = User(
        username='losfeos', email='losfeos@aa.io', password='password', name='Juanita',
        address='4 Pesadilla Ave', city='Madrid', state='Madrid', country='Espana',
        genre='pop, punk, pop punk', profile_pic='https://i.imgur.com/A3tYSct.png')
    user07 = User(
        username='hermanli', email='hermanli@aa.io', password='password', name='Herman Li', address='21781 Ventura Blvd. #115', city='Woodland Hills', state='CA', country='USA',
        genre='metal, power metal, fantasy metal', profile_pic='https://i.imgur.com/RdBku9N.jpg'
    )
    user08 = User(
        username='hexvessel', email='hexvessel@aa.io', password='password', name='Mathew Kvohst McNerney', address='unknown', city='Somewhere', state='In the woods', country='Finland',
        genre='rock, folk rock, occult, psychedelic folk', profile_pic='https://i.imgur.com/GrXRz7s.jpg'
    )
    user09 = User(
        username='eterchamp', email='eternchamp@aa.io', password='password', name='Jason Tarpey', address='unknown',
        city='Austin', state='TX', country='USA',
        genre='metal, fantasy metal', profile_pic='https://i.imgur.com/bvmKetU.jpg'
    )
    user10 = User(
        username='ensiferum', email='ensiferum@aa.io', password='password', name='Markus Toivonen', address='unknown',
        city='Helsinki', state='Uusimaa', country='Finland',
        genre='metal, fantasy metal', profile_pic='https://i.imgur.com/EwrBmun.jpg'
    )

    db.session.add_all([
        user01, user02, user03, user04, user05, user06, user07, user08, user09, user10
        ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
