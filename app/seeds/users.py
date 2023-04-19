from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user01 = User(
        username='BrittanyArchers', email='unleash@aa.io', password='password', name='Brittany Slayes',
        address='123 Progressive Rd', city='Vancouver', state='British Columbia', country='Canada',
        genres='rock, rap', banner_url=None)
    user02 = User(
        username='accidente', email='blanca@aa.io', password='password', name='Blanca',
        address='123 Rainey St', city='Arlen', state='Texas', country='USA',
        genres='punk, pop-punk', banner_url=None)
    user03 = User(
        username='henry', email='henryrollins@aa.io', password='password', name='Henry Rollins',
        address='2300 Nichols Canyon Rd', city='Los Angeles', state='CA', country='USA',
        genres='punk,metal', banner_url='https://i.imgur.com/AugmhKB.jpg')
    user04 = User(
        username='melissabonnie', email='bonnie@aa.io', password='password', name='Melissa Bonnie',
        address='123 Rainey St', city='Montreux', state='Riviera-Pays-dEnhaut', country='Switzerland',
        genres='metal, opera-metal', banner_url=None)


    db.session.add_all([
        user01, user02, user03, user04])
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
