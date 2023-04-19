from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_purchases():
    song001 = Song(
        # first four years by black flag
        name= "Nervous Breakdown", album_id=1, price=.99, track_num= 1
    )
    song002 = Song(
        # first four years by black flag
        name= 	"Fix Me", album_id=1, price=.99, track_num= 2
    )
    song003 = Song(
        # first four years by black flag
        name= 	"I've Had It", album_id=1, price=.99, track_num= 3
    )
    song004 = Song(
        # first four years by black flag
        name= "Wasted", album_id=1, price=.99, track_num= 4
    )
    song005 = Song(
        # first four years by black flag
        name= 	"Jealous Again", album_id=1, price=.99, track_num= 5
    )
    song006 = Song(
        # first four years by black flag
        name= 	"Revenge", album_id=1, price=.99, track_num= 6
    )
    song007 = Song(
        # first four years by black flag
        name= "White Minority", album_id=1, price=.99, track_num= 7
    )
    song008 = Song(
        # first four years by black flag
        name= "No Values", album_id=1, price=.99, track_num= 8
    )
    song009 = Song(
        # first four years by black flag
        name= """You Bet We've Got Something Personal Against You!""", album_id=1, price=.99, track_num= 9
    )
    song010 = Song(
        # first four years by black flag
        name= 	"Clocked In", album_id=1, price=.99, track_num= 10
    )
    song011 = Song(
        # first four years by black flag
        name= 	"Six Pack", album_id=1, price=.99, track_num= 11
    )
    song012 = Song(
        # first four years by black flag
        name= 	"I've Heard It Before", album_id=1, price=.99, track_num= 12
    )
    song013 = Song(
        # first four years by black flag
        name= 	"American Waste", album_id=1, price=.99, track_num= 13
    )
    song014 = Song(
        # first four years by black flag
        name= 	"Machine", album_id=1, price=.99, track_num= 14
    )
    song015 = Song(
        # first four years by black flag
        name= "Louie Louie", album_id=1, price=.99, track_num= 15
    )
    song016 = Song(
        # first four years by black flag
        name= "Damaged I", album_id=1, price=.99, track_num= 16
    )



    song017 = Song(
        # abyss by unleash the archers
        name= "Waking Dream", album_id=2, price=.99, track_num= 1
    )
    song018 = Song(
        # abyss by unleash the archers
        name= "Abyss", album_id=2, price=.99, track_num= 2
    )
    song019 = Song(
        # abyss by unleash the archers
        name= "Through Stars", album_id=2, price=.99, track_num= 3
    )
    song020 = Song(
        # abyss by unleash the archers
        name= "Legacy", album_id=2, price=.99, track_num= 4
    )
    song021 = Song(
        # abyss by unleash the archers
        name= "Return To Me", album_id=2, price=.99, track_num= 5
    )
    song022 = Song(
        # abyss by unleash the archers
        name= "Soulbound", album_id=2, price=.99, track_num= 6
    )
    song023 = Song(
        # abyss by unleash the archers
        name= "Faster Than Light", album_id=2, price=.99, track_num= 7
    )
    song024 = Song(
        # abyss by unleash the archers
        name= "The Wind that Shapes the Land", album_id=2, price=.99, track_num= 8
    )
    song025 = Song(
        # abyss by unleash the archers
        name= "Carry the Flames", album_id=2, price=.99, track_num= 9
    )
    song026 = Song(
        # abyss by unleash the archers
        name= "Afterlife", album_id=2, price=.99, track_num= 10
    )



    song027 = Song(
        # time stands still by unleash the archers
        name= "Northern Passage", album_id= 4, price= .99, track_num= 1
    )

    song028 = Song(
        # time stands still by unleash the archers
        name= "Frozen Steel", album_id= 4, price= .99, track_num= 2
    )

    song029 = Song(
        # time stands still by unleash the archers
        name= "Hail of the Tide", album_id= 4, price= .99, track_num= 3
    )

    song030 = Song(
        # time stands still by unleash the archers
        name= "Tonight We Ride", album_id= 4, price= .99, track_num= 4
    )

    song031 = Song(
        # time stands still by unleash the archers
        name= "Test Your Metal", album_id= 4, price= .99, track_num= 5
    )

    song032 = Song(
        # time stands still by unleash the archers
        name= "Crypt", album_id= 4, price= .99, track_num= 6
    )

    song033 = Song(
        # time stands still by unleash the archers
        name= "No More Heroes", album_id= 4, price= .99, track_num= 7
    )

    song034 = Song(
        # time stands still by unleash the archers
        name= "Dreamcrusher", album_id= 4, price= .99, track_num= 8
    )

    song035 = Song(
        # time stands still by unleash the archers
        name= "Going Down Fighting", album_id= 4, price= .99, track_num= 9
    )

    song036 = Song(
        # time stands still by unleash the archers
        name= "Time Stands Still", album_id= 4, price= .99, track_num= 10
    )



    song037 = Song(
        # Apex by Unleash The Archers
        name="Awakening", album_id=3, price=0.99, track_num=1
    )

    song038 = Song(
        # Apex by Unleash The Archers
        name="Shadow Guide", album_id=3, price=0.99, track_num=2
    )

    song039 = Song(
        # Apex by Unleash The Archers
        name="The Matriarch", album_id=3, price=0.99, track_num=3
    )

    song040 = Song(
        # Apex by Unleash The Archers
        name="Cleanse The Bloodlines", album_id=3, price=0.99, track_num=4
    )

    song041 = Song(
        # Apex by Unleash The Archers
        name="The Coward's Way", album_id=3, price=0.99, track_num=5
    )

    song042 = Song(
        # Apex by Unleash The Archers
        name="False Walls", album_id=3, price=0.99, track_num=6
    )

    song043 = Song(
        # Apex by Unleash The Archers
        name="Ten Thousand Against One", album_id=3, price=0.99, track_num=7
    )

    song044 = Song(
        # Apex by Unleash The Archers
        name="Earth And Ashes", album_id=3, price=0.99, track_num=8
    )

    song045 = Song(
        # Apex by Unleash The Archers
        name="Call Me Immortal", album_id=3, price=0.99, track_num=9
    )

    song046 = Song(
        # Apex by Unleash The Archers
        name="Apex", album_id=3, price=0.99, track_num=10
    )


    db.session.add_all([
        song001, song002, song003, song004, song005, song006, song007, song008, song009, song010, song011, song012, song013, song014, song015, song016, song017, song018, song019, song020, song021, song022, song023, song024, song025, song026, song027, song028, song029, song030, song031, song032, song033, song034, song035, song036, song037, song038, song039, song040, song041, song042, song043, song044, song045, song046, song047, song048, song049, song050, song051, song052, song053, song054, song055, song056, song057, song058, song059, song060])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchases"))

    db.session.commit()
