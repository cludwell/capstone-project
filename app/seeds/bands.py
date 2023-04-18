from app.models import db, Band, environment, SCHEMA
from sqlalchemy.sql import text

# adds a band, you can add other bands if you want
def seed_bands():
    band01 = Band(
        name= 'Black Flag', city='Los Angeles', state='CA', country='USA', userId=3, artist_image='https://i.imgur.com/jg2l0GT.png',
        band_url='https://i.imgur.com/njk4Rcg.jpg',
        description= """Black Flag is an American punk rock band formed in 1976 in Hermosa Beach, California. Initially called Panic, the band was established by Greg Ginn, the guitarist, primary songwriter, and sole continuous member through multiple personnel changes in the band. They are widely considered to be one of the first hardcore punk bands, as well as one of the pioneers of post-hardcore. After breaking up in 1986, Black Flag reunited in 2003 and again in 2013. The second reunion lasted well over a year, during which they released their first studio album in nearly three decades, What The... (2013). The band announced their third reunion in January 2019. """,
        genres='punk'
    )
    band02 = Band(
        name= 'Unleash The Archers', city='Los Angeles', state='CA', country='USA', userId=1, artist_image='https://i.imgur.com/RRHHqxc.jpg',
        band_url='https://i.imgur.com/IIn1RA4.png',
        description= """
        Unleash The Archers were formed in 2007 by front-woman Brittney Slayes, together with her partner and the band's drummer Scott Buchanan, while attending the University of Victoria on Vancouver Island in British Columbia.  After moving to Vancouver in 2010 the band underwent several lineup changes, but were finally able to cement their unique, genre-blending style of heavy metal with the addition of Grant Truesdell in 2011 and Andrew Kingsley in 2013.  By weaving the aggression of the more extreme genres into the intricacies of traditional heavy metal, UTA have created a sound unlike anything else in the industry.  They embrace a commercial appeal that attracts music lovers of all types while maintaining a heavy edge that remains true to their death metal roots.  Since their inception UTA have always put an emphasis on touring, and travelled the roads by van booking their own North American tours for years before being picked up by an agent in 2016.  Their persistent, hard-working, down-to-earth attitude has garnered media attention all over the world, and their constant engagement on social platforms of all types has allowed for consistent growth and a dedicated, positively engaged fanbase that spans continents.

        UTA have been described as “show-stealers” and “wildly entertaining” by fans and peers alike, and they strive to put on a show that will stick with you long after you've left the venue.  Playing music is a passion for the band and this can be seen in their live performance as well as their music videos and writing style.

        UTA are currently signed to Napalm Records (Worldwide) and Ward Records (Japan).

        Vocals / Brittney Slayes
        Drums / Scott Buchanan
        Guitar / Grant Truesdell
        Guitar / Andrew Kingsley
        Bass / Nick Miller
        """,
        genres='punk'
    )

    db.session.add_all([
       band01, band02])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bands RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bands"))

    db.session.commit()
