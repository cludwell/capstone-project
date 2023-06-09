from app.models import db, Band, environment, SCHEMA
from sqlalchemy.sql import text

# adds a band, you can add other bands if you want
def seed_bands():
    band01 = Band(
        name= 'Black Flag',
        city='Los Angeles',
        state='CA',
        country='USA',
        user_id=3,
        artist_image='https://i.imgur.com/jg2l0GT.png',
        banner_url='https://i.imgur.com/nr3Ab9I.png',
        description= """Black Flag is an American punk rock band formed in 1976 in Hermosa Beach, California. Initially called Panic, the band was established by Greg Ginn, the guitarist, primary songwriter, and sole continuous member through multiple personnel changes in the band. They are widely considered to be one of the first hardcore punk bands, as well as one of the pioneers of post-hardcore. After breaking up in 1986, Black Flag reunited in 2003 and again in 2013. The second reunion lasted well over a year, during which they released their first studio album in nearly three decades, What The... (2013). The band announced their third reunion in January 2019. """,
        genres='punk, hardcore, old school hardcore, 80s punk',
        background_image='https://i.imgur.com/v6xPD85.jpg',
        background_color='#ffffff',
        background_color_secondary='#ffffff',
        text_color='#000000'

    )
    band02 = Band(
        name= 'Unleash The Archers',
        city='Vancouver',
        state='British Columbia',
        country='Canada',
        user_id=1,
        artist_image='https://i.imgur.com/RRHHqxc.jpg',
        banner_url='https://i.imgur.com/IIn1RA4.png',
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
        genres='metal, power metal, fantasy metal',
        background_image='https://i.imgur.com/UhUSOKk.jpg',
        tiled=True,
        background_color='#000000',
        background_color_secondary='#000000',
        text_color='#ffffff'
    )
    band03 = Band(
        name='Accidente',
        city='Madrid',
        state='Madrid',
        country='Espana',
        user_id=2,
        artist_image='https://i.imgur.com/3MdWhs9.jpg',
        banner_url='https://i.imgur.com/ktP2bDg.png',
        description="""Accidente is a pop punk band from Madrid Spain that sings about politics and friendship.""",
        genres='punk, pop, pop punk, spanish punk, spanish',
        background_image='https://i.imgur.com/L1utUw7.png',
        background_color='#ffffff',
        background_color_secondary='#ffffff',
        text_color='#000000'

    )
    band04 = Band(
        name='Ad Infinitum',
        city='Montreux',
        state='Riviera-Pays-dEnhaut',
        country='Switzerland',
        user_id=4,
        artist_image='https://i.imgur.com/okSLGZX.jpg',
        banner_url='https://i.imgur.com/tl6HxgB.png',
        description="""Ad Infinitum is a Swiss/German symphonic metal band. Originally a solo project of Swiss singer Melissa Bonny, it turned into a full band with arrival of drummer Niklas Müller, bassist Jonas Asplind and guitarist Adrian Theßenvitz. The band signed a deal with Napalm Records in July 2019 and released a debut album - Chapter I: Monarchy - in April 2020.""",
        genres='metal, power metal, fantasy metal',
        background_image='https://i.imgur.com/vhqT7aY.jpg',
        background_color='#303e4b',
        background_color_secondary='#4D6275',
        text_color='#000000'
    )
    band05 = Band(
        name='Fellowship',
        city='Harwich',
        state='Essex',
        country='UK',
        user_id=5,
        artist_image='https://i.imgur.com/BSA9XQ8.jpg',
        banner_url='https://i.imgur.com/PuR7FbV.png',
        description=
        """
        Hailing from Harwich, England, Fellowship is a four-piece on a mission to take melodic power metal to new heights.

        Continuing in the magical tradition of Twilight Force, Rhapsody and Majestica, and bringing the genre's emotional stakes to new heights, our debut album 'The Saberlight Chronicles' is equal parts high fantasy narrative concept record and heartfelt collection of absolute bangers… at least that's how we think of it!

        Taking on the subject of mental health at a time in our lives where we all need a pick-me-up, the album tells a mythical story of self-worth, self-discovery and the quest for courage, all through songs so catchy you'll be singing along on the very first listen.

        Metal has never felt so good!""",
        genres='metal, power metal, fantasy metal',
        background_image='https://i.imgur.com/ODNWURZ.jpg',
        background_color='#000000',
        background_color_secondary='#000000',
        text_color='#ff4e00'
    )

    band06 = Band(
        name='Eternal Champion',
        city='Austin',
        state='TX',
        country='USA',
        user_id=9,
        artist_image='https://i.imgur.com/bvmKetU.jpg',
        banner_url='https://i.imgur.com/ejvS3Ob.jpg',
        description=
        """
        Not to be confused with Eternal Champion from Charleston, Illinois.

        In Michael Moorcock's fantasy universe, the Eternal Champion is a reincarnating hero who's lived many lives in the multiverse and whose deeds are part of a larger interdimensional struggle for cosmic balance between the forces of Law and Chaos.""",
        genres='power metal, fantasy metal, epic',
        background_image='https://i.imgur.com/jiEvZfU.jpg',
        background_color='#E0CDB8',
        background_color_secondary='#E0CDB8',
        text_color='#000000'
    )
    band07 = Band(
        name='Juanita y los Feos',
        city='Madrid',
        state='Madrid',
        country='España',
        user_id=6,
        artist_image='https://i.imgur.com/7aNj7eM.jpg',
        banner_url='https://i.imgur.com/cwUi6Pt.png',
        description=
        """
        Juanita y los Feos es una banda de punk nueva ola formada a finales de 2004 en Madrid por músicos de la escena independiente. Su actual formación está compuesta por Juanita a la voz, Adolfo Párraga a la batería, Ángel al bajo, Héctor al órgano y Fa a la guitarra. """,
        genres='pop punk, pop, punk, 77, new wave, post-punk',
        background_image='https://i.imgur.com/lcbPSY2.jpg',
        background_color='#000000',
        background_color_secondary='#000000',
        text_color='#ffffff'
    )
    band08 = Band (
        name='Dragonforce',
        city='London',
        state='London',
        country='UK',
        user_id=7,
        artist_image='https://i.imgur.com/yLPylhb.jpg',
        banner_url='https://i.imgur.com/auMhu2h.png',
        description="""DragonForce are a British power metal band from London, England. The band was formed in 1999 by guitarists Herman Li and Sam Totman, and are known for their long and fast guitar solos, fantasy-themed lyrics and retro video game-influenced sound. DragonForce's current lineup comprises Li, Totman, vocalist Marc Hudson, drummer Gee Anzalone and bassist Alicia Vigil. The band have been through several lineup changes throughout their career; longtime members in vocalist ZP Theart, keyboardist Vadim Pruzhanov, drummer Dave Mackintosh and bassist Frédéric Leclercq are among the former members of the band. """,
        genres='fantasy metal, power metal, epic',
        background_image='https://i.imgur.com/Io2bKSF.png',
        background_color='#000000',
        background_color_secondary='#c86eff',
        text_color='#000000'

    )
    band09 = Band (
        name='Hexvessel',
        city='Somewhere',
        state='in the woods',
        country='Finland',
        user_id=8,
        artist_image='https://i.imgur.com/GrXRz7s.jpg',
        banner_url='https://i.imgur.com/gJfuwGk.png',
        description="""Founded in the magical forests of Finland, via the green and pleasant lands of England and Ireland, enigmatic “spirit-trafficking” Finnish forest-psych weirdos Hexvessel are wyrd folk. Formed in 2009 by English/Irish singer/songwriter Mat "Kvohst" McNerney, also known for his work with Beastmilk (now known as Grave Pleasures), The Deathtrip, guest spots with Carpenter Brut and Me & That Man and his earlier work with Norwegian Black Metal bands Code & Dødheimsgard, Hexvessel has truly become a melting cauldron or “vessel,” a potent “hex” of spellwork. Hexvessel spin songs in the oral tradition of the old balladeers, conjuring wild psychedelic rituals and hypnotic pagan prayers. By drawing on older folk acts like Shirley Collins, Vashti Bunyan, later psych rock bands and 90s Black Metal to more recent artists such as Current93, Nick Cave and Coil, imbued with Karelian and Nordic folklore rhythms, Hexvessel have created a sound that is both ancient, heavy, modern and genre-less. Hexvessel have been previously nominated for 2 Finnish Emma (Grammy) awards, 2 Metal Hammer awards and 3 Prog Magazine awards, winning 2 Finnish Femma awards and landed several times in both the national and alternative charts in Finland. Rock-A-Rolla Magazine dubbed them “an ever-shifting beast, floating between unhurried bliss and fevered rapture.” Hexvessel's sound expands outward from their eerie, signature, ritual-esque folk into a genre-twisting cauldron of otherworldly rock that Prog Magazine identifies containing nods towards “the Beatles, HP Lovecraft and King Crimson.” """,
        genres='folk metal, folk, metal, prog',
        background_image='https://i.imgur.com/Mcy0sR6.jpg',
        background_color='#8EBEE1',
        background_color_secondary='#8EBEE1',
        text_color='#ffffff'
    )
    band10 = Band (
        name='Ensiferum',
        city='Somewhere',
        state='Uusimaa',
        country='Finland',
        user_id=10,
        artist_image='https://i.imgur.com/0WLKmCW.jpg',
        banner_url='https://i.imgur.com/PhrBvZC.png',
        description="""Ensiferum was founded in 1995 by Markus Toivonen (guitar), Sauli Savolainen (bass) and Kimmo Miettinen (drums). In the next year, Jari Mäenpää was taken into the band as singer and second guitar-player. In 1997, the first demo was released, containing three songs.
The highly stylized logo of Ensiferum has appeared on all of their releases.
Guitarist Markus Toivonen at Rockharz 2016
Ex-accordionist Netta Skog at Rockharz 2016

In 1998, Savolainen and Miettinen left the band and were replaced by Jukka-Pekka Miettinen (Kimmo Miettinen's little brother, then 14 years old) and Oliver Fokin. In January 1999, a second demo was recorded, which although it did not produce a recording deal, boosted the band's confidence. In November 1999 a third demo Hero in a Dream was recorded, and was successful in obtaining a record deal with Spinefarm Records. The logo that appears on all the band's releases was designed for the third demo by Tuomas Tahvanainen, who also designed the logos for the earlier demos. In 2000, the band went into the studio to work on their first album, Ensiferum, which was released in July 2001. In the same year, Meiju Enho joined them as a keyboard-player. """,
        genres='folk metal, folk, metal, prog',
        background_image='https://i.imgur.com/IKN3xsl.jpg',
        background_color='#000000',
        background_color_secondary='#000000',
        text_color='#ffffff'
    )
    db.session.add_all([
       band01, band02, band03, band04, band05, band06, band07, band08, band09, band10
       ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_bands():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bands RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bands"))

    db.session.commit()
