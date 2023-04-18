from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album01 = Album(
        name= 'The First Four Years', price=4.99,
        description="The First Four Years is a compilation album by the American hardcore punk band Black Flag. It was released in 1983 on SST Records. The compilation consists of all of the group's material released before Henry Rollins became the band's vocalist in 1981. It essentially collects the extended plays Nervous Breakdown (1979), Jealous Again (1980), Six Pack (1981), and the single Louie Louie, with two tracks from various artists' compilation albums. \nTracks 1-4 are taken from Nervous Breakdown, tracks 5-9 are taken from Jealous Again, tracks 11-13 are from Six Pack, and tracks 15-16 are taken from the Louie Louie single. Tracks 10 and 14 were originally released on the New Alliance Records compilation albums Cracks in the Sidewalk (1980) and Chunks (1981).",
        band_id=2, album_image='https://i.imgur.com/qoDd5GQ.jpg',
        genre='Punk'
    )
    album02 = Album(
        name= 'Abyss', price=9.99,
        description=
        """Less than a year after the release of their covers EP Explorers, Canadian melodic power metal quartet UNLEASH THE ARCHERS have sharpened their arrows and hit the bullseye once again with their fifth full-length album, Abyss. Featuring 10 new tracks, this adventure is a concept album and sequel to 2017's Apex, and was once again recorded with legendary producer Jacob Hansen of Hansen Studios in Denmark. Abyss succeeds in showcasing the mind-blowing technical craftmanship of the young four-piece with the perfect mix of highly complex, catchy bangers and moody, synth-infused power ballads. Pairing traditional heavy sounds in the vein of Iron Maiden and Judas Priest with fast-paced power metal, the album is once again accented by frontwoman Brittney Slayes' raw four octave mezzo-soprano, shining both in powerful anthems like the outstanding title track “Abyss” as well as the fragile intro of the epic “The Wind That Shapes The Land”, and contrasted with guttural screams on the soaring “Return To Me” or the transcendent album closer “Afterlife". The quartet from Vancouver has forged their own niche in the world of metal and cemented it with memorable live shows all over the world, and now, a lucky 13 years after their inception, they've delivered their strongest album to date.

        © NAPALM RECORDS
        credits
        released August 21, 2020 """,
        band_id=1, album_image='https://i.imgur.com/q1tRxn6.jpg',
        genre='metal, power metal'

    )
    album02 = Album(
        name= 'Apex', price=9.99,
        description=
        """Deluxe 2CD + 10" Earbook edition available here: lnk.to/ApexAnniversary/napalmrecords

        Fresh off of the release of their JUNO Award-winning 2020 full-length album Abyss, Canadian modern power metal frontrunners UNLEASH THE ARCHERS revisit its stunning predecessor, 2017's seminal Apex. In celebration of the album's Five Year Anniversary, Apex is now available in a limited reissue two-disc Earbook edition as well as Deluxe Digital formats! Both the 2-CD Earbook and Deluxe Digital versions will include the full original Apex album plus two new bonus tracks - “Falsewave” and “Acoustipex” - genius reimaginings of the album tracks “False Walls” and “Apex”, respectively, as well as a newly mastered instrumental version of the original album. The bonus tracks will also come on a limited edition single-style 10” vinyl EP available as part of the Earbook Edition. The synthwave reimagining of “False Walls”, entitled “Falsewave”, translates perfectly with the original track's super moody, midtempo vibes, while the “Apex” reincarnation “Acoustipex” haunts with gothic folk/country-western cinematic flavor, breathing new life into the album's title track. Make sure to snatch these two rarities and grab your copy of the reissue of Apex now via Napalm Records - an album Metal Hammer describes as delivering “sheer power and melody”!

        credits
        released November 18, 2022  """,
        band_id=1, album_image='https://i.imgur.com/q1tRxn6.jpg',
        genre='metal, power metal'

    )
    album02 = Album(
        name= 'Time Stands Still', price=9.99,
        description=
        """Available from Napalm Records!
        www.napalmrecordsamerica.com/store/unleashthearchers
        shop.napalmrecords.com/unleashthearchers
        credits
        released June 26, 2015

        Vocals: Brittney Slayes
        Drums: Scott Buchanan
        Guitar/Screams: Grant Truesdell
        Guitar/Screams: Andrew Kingsley
        Bass: Kyle Sheppard  """,
        band_id=1, album_image='https://i.imgur.com/R4eITe1.jpg',
        genre='metal, power metal'

    )
    db.session.add_all([
        album01, album02])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
