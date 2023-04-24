from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album01 = Album(
        name= 'The First Four Years', price=4.99,
        description="The First Four Years is a compilation album by the American hardcore punk band Black Flag. It was released in 1983 on SST Records. The compilation consists of all of the group's material released before Henry Rollins became the band's vocalist in 1981. It essentially collects the extended plays Nervous Breakdown (1979), Jealous Again (1980), Six Pack (1981), and the single Louie Louie, with two tracks from various artists' compilation albums. \nTracks 1-4 are taken from Nervous Breakdown, tracks 5-9 are taken from Jealous Again, tracks 11-13 are from Six Pack, and tracks 15-16 are taken from the Louie Louie single. Tracks 10 and 14 were originally released on the New Alliance Records compilation albums Cracks in the Sidewalk (1980) and Chunks (1981).",
        band_id=1, album_image='https://i.imgur.com/qoDd5GQ.jpg',
        genre='Punk'
    )
    album02 = Album(
        name= 'Abyss', price=9.99,
        description=
        """Less than a year after the release of their covers EP Explorers, Canadian melodic power metal quartet UNLEASH THE ARCHERS have sharpened their arrows and hit the bullseye once again with their fifth full-length album, Abyss. Featuring 10 new tracks, this adventure is a concept album and sequel to 2017's Apex, and was once again recorded with legendary producer Jacob Hansen of Hansen Studios in Denmark. Abyss succeeds in showcasing the mind-blowing technical craftmanship of the young four-piece with the perfect mix of highly complex, catchy bangers and moody, synth-infused power ballads. Pairing traditional heavy sounds in the vein of Iron Maiden and Judas Priest with fast-paced power metal, the album is once again accented by frontwoman Brittney Slayes' raw four octave mezzo-soprano, shining both in powerful anthems like the outstanding title track “Abyss” as well as the fragile intro of the epic “The Wind That Shapes The Land”, and contrasted with guttural screams on the soaring “Return To Me” or the transcendent album closer “Afterlife". The quartet from Vancouver has forged their own niche in the world of metal and cemented it with memorable live shows all over the world, and now, a lucky 13 years after their inception, they've delivered their strongest album to date.

        © NAPALM RECORDS
        credits
        released August 21, 2020 """,
        band_id=2, album_image='https://i.imgur.com/q1tRxn6.jpg',
        genre='metal, power metal'

    )
    album03 = Album(
        name= 'Apex', price=9.99,
        description=
        """Deluxe 2CD + 10" Earbook edition available here: lnk.to/ApexAnniversary/napalmrecords

        Fresh off of the release of their JUNO Award-winning 2020 full-length album Abyss, Canadian modern power metal frontrunners UNLEASH THE ARCHERS revisit its stunning predecessor, 2017's seminal Apex. In celebration of the album's Five Year Anniversary, Apex is now available in a limited reissue two-disc Earbook edition as well as Deluxe Digital formats! Both the 2-CD Earbook and Deluxe Digital versions will include the full original Apex album plus two new bonus tracks - “Falsewave” and “Acoustipex” - genius reimaginings of the album tracks “False Walls” and “Apex”, respectively, as well as a newly mastered instrumental version of the original album. The bonus tracks will also come on a limited edition single-style 10” vinyl EP available as part of the Earbook Edition. The synthwave reimagining of “False Walls”, entitled “Falsewave”, translates perfectly with the original track's super moody, midtempo vibes, while the “Apex” reincarnation “Acoustipex” haunts with gothic folk/country-western cinematic flavor, breathing new life into the album's title track. Make sure to snatch these two rarities and grab your copy of the reissue of Apex now via Napalm Records - an album Metal Hammer describes as delivering “sheer power and melody”!

        credits
        released November 18, 2022  """,
        band_id=2, album_image='https://i.imgur.com/XEEdAjI.jpg',
        genre='metal, power metal'

    )
    album04 = Album(
        name= 'Canibal', price=.99,
        description=
        """Si esto ha salido adelante es por el cariño de todxs lxs que remáis cuando las cosas se ponen feas. Este disco es también vuestro. Gracias a Oli y Edu, por salvar la banda. A Mario, por el currazo que ha puesto en el diseño. A Paco, que nos presta su casa y su consejo. A Karlitos, que es familia. A cada uno de los sellos que seguís apostando por nosotrxs porque sois importantes y nos flipa lo que hacéis. A todxs las que seguís dando vida al punk contestatario y honesto desde el margen. A quienes ponéis lo común en el centro para desde ahí combatir a este monstruo caníbal que acecha dentro y fuera de nuestros círculos.

        La derrota es sólo de quien se rinde.

        Accidente
        credits
        released July 7, 2020

        Grabado, mezclado y producido por Pablo Martínez en los estudios Musigrama (www.musigrama.com), Madrid, entre mayo de 2019 y mayo de 2020.
        Masterizado en Sonic Iguana Studio por Mass Giorgini.
        Arte, diseño: Mario Riviere (www.marioriviere.com).
        Todos los temas por Accidente: Ranzio (bajo y coros), Edu (batería), Oli (batería), Miguel (guitarra y coros), Pablo (guitarra, teclados y coros) y Blanca (voz).
        """,
        band_id=3, album_image='https://i.imgur.com/FVH3QRR.jpg',
        genre='pop, pop punk, leftist'

    )
    album05 = Album(
        name= 'Chapter III Downfall ', price=9.99,
        description=
        """Physical editions available here:
        lnk.to/ChapterIIIDownfall/napalmrecords


        In 2023, rising modern symphonic metal outfit AD INFINITUM reenter the scene with their electrifying third studio album, Chapter III - Downfall, out March 31 via Napalm Records. AD INFINITUM's signature sound - consisting of punching, modern, even progressive riffs, addictive symphonic nuances, hooky choruses and Melissa Bonny's inimitably versatile vocal skills - has positioned them for unstoppable ascension in the metal world, and is now perfected with ease on Chapter III - Downfall. This next offering provides another wave of proof of the band's breakout success, which the energizing four-piece - consisting of Melissa Bonny (vocals), Adrian Thessenvitz (guitars), Korbinian Benedict (bass) and Niklas Müller (drums) - garnered almost immediately, with millions of video views and streams worldwide since the release of their debut in 2020.
        Chapter III - Downfall bewitches with an innovative sound full of soaring melodic splendor, juxtaposed against brooding, dark, even gothic heaviness. Exploring concepts of Ancient Egyptian history and mythology, AD INFINITUM melds a perfect balance of storytelling and technically sophisticated songwriting, spreading their...  more
        credits
        released March 31, 2023
        license
        all rights reserved
                """,
        band_id=4, album_image='https://i.imgur.com/Gfh06v4.jpg',
        genre='metal, symphonic metal'
    )
    album06 = Album(
        name= 'The Saberlight Chronicles', price=9.99,
        description=
        """
        Hailing from Harwich, England, Fellowship is a four-piece on a mission to take melodic power metal to new heights.

        Continuing in the magical tradition of Twilight Force, Rhapsody and Majestica, and bringing the genre's emotional stakes to new heights, our debut album 'The Saberlight Chronicles' is equal parts high fantasy narrative concept record and heartfelt collection of absolute bangers… at least that's how we think of it!

        Taking on the subject of mental health at a time in our lives where we all need a pick-me-up, the album tells a mythical story of self-worth, self-discovery and the quest for courage, all through songs so catchy you'll be singing along on the very first listen.

        Metal has never felt so good!""",
        band_id=5, album_image='https://i.imgur.com/3nMIX6n.jpg',
        genre='metal, symphonic metal'
    )
    album07 = Album(
        name= 'The Armor of Ire', price=9.99,
        description=
        """
         8th vinyl pressing by No Remorse Records, limited to 500 copies on “Blood of my Enemies” 180 gram colored vinyl.

        Includes unlimited streaming of THE ARMOR OF IRE via the free Bandcamp app, plus high-quality download in MP3, FLAC and more.
        Sold Out
        """,
        band_id=6, album_image='https://i.imgur.com/9c2Td5K.jpg',
        genre='metal, fantasy metal'
    )
    album08 = Album(
        name= 'Pesadilla Adulta', price=9.99,
        description=
        """
         Grabado en 'Tigruss Estudios' en abril de 2011 Por Pepe Tigruss. Mezclado en 'El Castillo Alemán' por Carlos Hernández en octubre de 2011. Masterizado por Carlos Hernández y Ruben Suarez.

        Todas las canciones por Juanita y Los Feos excepto * por Paco Frutos y Esposa. Foto portada María Blanco.

        El Final
        youtu.be/PcjyAo0TqyE

        Traga, Mastica, Vomita
        youtu.be/3iy-B0aYqJg

        Diseño: www.lacamorra.com

        JYLF: juanitaylosfeos(a)gmail.com
        juanitaylosfeos.bandcamp.com

        © 2011 Juanita y Los Feos.

        ---

        """,
        band_id=7, album_image='https://i.imgur.com/9kGxTeO.jpg',
        genre='pop, pop-punk'
    )
    album09 = Album(
        name= 'Nueva Numancia', price=9.99,
        description=
        """
         Beat Generation BEAT 47
        La Vida es un mus MUS83

        Grabado en 'Tigruss Estudios' en enero de 2014 Por Pepe Tigruss. Mezclado y masterizado en los estudios 'Red Led' por Joaquín Pizarro en marzo de 2014.

        Todas las canciones por Juanita y Los Feos.

        Diseño e ilustración: Fadrique Gonzalez
        JYLF: juanitaylosfeos(a)gmail.com
        www.lavidaesunmus.com

        ---

        Recorded in january 2014 at "Tigruss Estudios" by Pepe Tigruss, mixed an mastered in march 2014 at 'Red Led Studio' by Joaquín Pizarro.

        All songs by Juanita y los Feos.

        Design and Illustration by Fadrique González
        JYLF: juanitaylosfeos(a)gmail.com
        www.lavidaesunmus.com
        credits
        released April 25, 2014

        Juanita - Voz
        Fa - Guitarra
        Ángel - Bajo
        Anibal - Órgano
        Adolfo - Batería
        license
        all rights reserved

        """,
        band_id=7, album_image='https://i.imgur.com/b9yL1En.jpg',
        genre='pop, pop-punk'
    )
    album10 = Album(
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
        band_id=2, album_image='https://i.imgur.com/R4eITe1.jpg',
        genre='metal, power metal'

    )
    album11 = Album(
        name= 'Pulso', price=9.99,
        description=
        """Torpes pero intensos… define bien la actitud con la que muchos de nosotros encaramos la vida cuando empezábamos a caminar… Y así, igual que J., hemos chocado con toda esta mierda: inseguros, vulnerables, y aterrados por haber sido despojados poco a poco de nuestra espontaneidad, de nuestra energía infinita y esa rabia incendiaria de la que sacas la fuerza cuando eres un crío. Ya no somos niños, y a menudo nos atrapa el cinismo y el miedo, pero esto no ha acabado. La misma mísera realidad que nos motivó a rebelarnos entonces, sigue asfixiándonos hoy. La guerra es la paz, ya lo decían Orwell, y los RIP, y este pulso estará presente en nuestras vidas, hasta que palmemos. Le dedicamos este disco a todos los que se juegan la libertad y el pellejo luchando, sin purezas, sin egos, con perseverancia y entereza y por amor a la libertad. A los más de 40 anarquistas detenidos en los últimos meses por el Estado.

        Este disco es de mucha gente. De los que nos apoyáis incondicionalmente en lo técnico y en lo anímico desde hace ya 5 años, de Mar por darnos el lujazo de ocuparse y preocuparse de ilustrar y darle ojos y tacto a este proyecto, de Paco y Frutos por darle oídos y cariño. De Dieguito, el sexto miembro de Accidente. Raúl por las correcciones. De todas las distris, centros sociales, personas y colectivos por su fuerza y corazón. De quienes apoyan y y no dejan que muera el punk autogestionado, combativo e irreverente.
        credits
        released February 14, 2016

        Grabado en los Estudios Musigrama, Madrid en invierno de 2015 y 1016.
        Grabado y mezclado por Pablo Martínez.
        Ayudante de grabación: Dani Frutos
        Masterizado en Sonic Iguana Studio, USA por Mass Giorgini.
        Arte: Mar Estrama www.marestrama.com
        Diseño y adaptación: Miguel Martínez
        Todos los temas por Accidente: Blanca, Miguel, Ranzio, Carlos y Pablo.
        Solo de guitarra en "Jueces" por Frutos.

        ESTE DISCO ES GRATIS, PERO LA PLATAFORMA PERMITE SÓLO 200 DESCARGAS SIN COSTE. NO PAGUES POR ÉL, BÁJALO LIBREMENTE DE AQUÍ: accidentepunk.blogspot.com.es / THIS RECORD IS FREE FOR YOU DOWNLOAD IT. DO NOT PAY FOR IT. GET IT HERE: accidentepunk.blogspot.com.es
        license
        some rights reserved  """,
        band_id=3, album_image='https://i.imgur.com/ooi5Ubv.jpg',
        genre='pop, pop punk, positive'

    )
    album12 = Album(
        name='Inhuman Rampage', price=9.99,
        description="""Inhuman Rampage is the third studio album by British power metal band DragonForce, released first on 28 December 2005[4] in Japan, and 9 January 2006 elsewhere, through Victor Entertainment and Roadrunner Records, respectively. Its first single, "Through the Fire and Flames", has received rock radio and Fuse TV airplay, and has appeared as a playable track on the video games Guitar Hero III: Legends of Rock and Rocksmith 2014 Edition - Remastered. It is the band's first album to feature harsh vocals, which were recorded by Demoniac vocalist Lindsay Dawson; the album is also the last to feature bassist Adrian Lambert, who left the band in 2005 and was replaced by Frédéric Leclercq before the album's release.  """,
        band_id=8, album_image='https://i.imgur.com/yDR2Q5w.png',
        genre='metal, power metal, fantasy metal'
    )
    album13 = Album(
        name='Sonic Firestorm', price=9.99,
        description="""Sonic Firestorm is the second studio album by British power metal band DragonForce, released through Noise Records on 11 May 2004. It is the first album to feature bassist Adrian Lambert and drummer Dave Mackintosh. The reissue of this album was released on 22 February 2010, along with a remixed and remastered version of the band's first album, Valley of the Damned. The re-release also came with the bonus track "Cry of the Brave", which was a Japanese bonus track on the original release.  """,
        band_id=8, album_image='https://i.imgur.com/9Aswxnh.jpg',
        genre='metal, power metal, fantasy metal'
    )
    album14 = Album(
        name='Valley of the Damned', price=9.99,
        description="""Valley of the Damned is the debut studio album by British power metal band DragonForce. In 2000, while the band was still known as DragonHeart, a demo of the same name was recorded and sent to Noise Records, subsequently gaining the band a deal with the label. It was then re-recorded in late 2002 and released as a full-length studio album on 25 February 2003, following the band's obtainance of the deal with Noise and change in name to DragonForce. The album was set to be remastered and released with a bonus DVD on 24 September 2007, but was subsequently delayed and eventually released on 22 February 2010, along with the re-release of the band's second album, Sonic Firestorm.  """,
        band_id=8, album_image='https://i.imgur.com/MqOojTu.jpg',
        genre='metal, power metal, fantasy metal'
    )

    db.session.add_all([
        album01, album02, album03, album04, album05, album06, album07, album08, album09, album10, album11, album12, album13, album14
        ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
