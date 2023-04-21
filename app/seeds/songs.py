from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
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
        name= "Waking Dream", album_id=2, price=.99, track_num= 1,
        lyrics="""Wandering a waking dream while reaching for the light
                As the day falls over into night
                Centuries like flowing streams as years go rushing by
                Waiting in the dark for afterlife"""
    )
    song018 = Song(
        # abyss by unleash the archers
        name= "Abyss", album_id=2, price=.99, track_num= 2,
        lyrics="""Open my eyes in a daze
        How long has it been? Am I so out of place?
        Warmth I can no longer feel
        My mountain is gone, I'm surrounded by steel

        The strangest of structures arises ahead
        Seems to be held up by nothing
        Where have I gone, do I dream?
        How can the stars be all I can see?

        Dark embrace
        Has someone awakened me? Please show your face
        Cold and quiet space

        Out so far beyond stars and the sun
        Filling my heart up with wonder, unknown
        Now, to the edge of imagination
        Open my eyes to phenomenon, and hope

        Feverishly I explore
        Searching for someone, there has to be more
        I can't be the only one here
        My path always guides me, there's nothing to fear

        Then why do I feel so immensely alone
        This can't be the end of my story
        Onward I go once again
        Fighting my way to my final breath

        Into the abyss

        Out so far beyond stars and the sun
        Filling my heart up with wonder, unknown
        Now, to the edge of imagination
        Open my eyes to phenomenon, and hope

        Summon the strength of millenniums past
        Forged by the fire and flame
        I am the weapon of empires vast
        Immortal is more than a name

        Out so far beyond stars and the sun
        Filling my heart up with wonder, unknown
        Now, to the edge of imagination
        Open my eyes to phenomenon, and hope

        Cry into the chasm ahead
        Into the sky never ending, although
        Time will tell if I'm worthy of it
        A future of final transcending, alone"""
    )
    song019 = Song(
        # abyss by unleash the archers
        name= "Through Stars", album_id=2, price=.99, track_num= 3,
        lyrics="""As we make our way through starry night
        Only memories to hold the light
        As the darkness closes in again
        Feel the hunger of awakening

        Reflect on a thousand lifetimes spent among the slain
        And realize I know nothing of life beyond the blade

        Carry me on the winds of a storm
        Show me the power of the universe
        Give me the strength of wing to soar
        Show me the power of the universe

        Wandering among the ghosts that I have made
        My companions in this escapade
        On the edges of periphery
        Hovers promise of a better way
        Though I feel that I've been here before
        There's no time to wonder anymore
        On this vessel as it carries me
        Headlong into destiny

        No longer will I ignore the man I'm meant to be

        Carry me on the winds of a storm
        Show me the power of the universe
        Give me the strength of wing to soar
        Show me the power of the universe

        Carry me
        Show me the power"""
    )
    song020 = Song(
        # abyss by unleash the archers
        name= "Legacy", album_id=2, price=.99, track_num= 4,
        lyrics="""As I was wandering the world
        Trying so hard to find you
        To give me purpose in this life I'd lost
        And as I learned to forgive you
        For all you'd done

        Destiny opened a door
        And showed you weren't the one
        Worth searching for

        But as time wore away at my will to carry on
        Only vengeance could take what I'd give to see it done

        When I finally found the words
        The ones I knew would wake you
        To take you from her and to make you mine
        Somehow all I felt was hollow
        Please tell me why

        Nothing is ever the way
        You think that it should be
        It's not the same

        As we stand in this place and you wonder who I am
        Can't you see in my face I'm his son, his earth and ash
        And you are here as servant one last time
        Together we will bring her to the light

        No more hiding away in your apex again
        Not when spending your days as a slave is near an end
        I promise this, I vow to set you free
        You are the answer, you are my legacy"""
    )
    song021 = Song(
        # abyss by unleash the archers
        name= "Return To Me", album_id=2, price=.99, track_num= 5,
        lyrics="""Return what you have taken from me
        Rightfully mine, I will not allow this, thief
        Think you know this weapon in your hands?
        You are a fool, I am his only command
        Attack! My boys are coming for you
        Try as you might, you can't escape your doom
        I am alpha, rule absolute
        Think you can win? I know you only can lose

        Now behold my finest hour, ultimate power
        All the universe is mine
        Wind and water, earth and fire

        And so, you see how futile the fight
        This is the end, why do you even try?
        Kneel before me, swear to obey
        And I'll let you live, serve for eternity

        Now behold my finest hour
        Assured victory, ultimate power
        All the universe is mine
        To control, to define

        No son, you can not run, I'll find you
        No matter how far you fly
        Hear me, fear me
        I'll follow you for all of time

        Now behold my finest hour, ultimate power
        Now behold my finest hour, ultimate power
        All the universe is mine
        Wind and water, earth and fire
        """
    )
    song022 = Song(
        # abyss by unleash the archers
        name= "Soulbound", album_id=2, price=.99, track_num= 6,
        lyrics="""We race around the melted char
        Of what was once a neutron star
        And use the gravity to whip
        Us into dark galactic rifts
        Yet still somehow we can't escape
        They have no flaw, they feel no pain
        These twisted shadows of the men I once condemned

        (We can) Why do you seek us
        (See right) You won't defeat us
        (Through you) Turn around while you can

        (Your soul) Try to remember
        (Is ours) Why you defend her
        (This time) Shatter the master plan

        Soulbound; endlessly, forever
        Locked between the darkness and the light
        Don't drown in the swarming blackened rising
        Hold on to humanity and fight

        Tormented by the tethering
        Of souls to phantoms that remain
        These spectres seem devoid of life
        But there is something in their eyes
        Refuse to see they can't be saved
        I push to pull them from the grave
        End their addiction to the thrall
        Once and for all

        But who am I to be their saviour
        Slave to time
        When I am doomed to be in chains
        For all my life

        Soulbound; endlessly, forever
        Locked between the darkness and the light
        Don't drown in the swarming blackened rising
        Hold on to humanity and fight"""
    )
    song023 = Song(
        # abyss by unleash the archers
        name= "Faster Than Light", album_id=2, price=.99, track_num= 7,
        lyrics="""Once more we're flying fast as light
        Dark matter passing in the night
        Pursued by a force we can't outrun
        As we hurtle towards a dying sun

        We maneuver through the remnants of a moon on the solar winds of supernovas
        There is not a place to hide, the Matriarch is close behind, it's plain to see she's coming for us all

        Fly till the stars collide, till we live or die
        Faster than ever before
        Fly to forget your past, to move on at last
        Fly on and forever more
        Faster than light

        Still farther and beyond we race
        Into the outer reach of space
        Through systems I will never know
        And yet still we have nowhere to go

        As the planets shatter right before my eyes there's no turning back, she's already here
        Stare into infinity, and know that time is short for me, I can't deny she's coming for us all

        Why do I not turn and fight? And see if I somehow might, set myself free
        Why do I feel so alive? As if suddenly I somehow find, I'm where I should be?

        Finally, I feel I can face up to all that I've done and become something more

        Fly till the stars collide, till I live or die
        Faster than ever before
        Fly to forgive my past, to move on at last
        Fly on and forever more
        Fly till the stars collide, till I live or die
        Faster than ever before
        Fly to forgive my past, to move on at last
        Fly on and forever more
        Faster than light"""
    )
    song024 = Song(
        # abyss by unleash the archers
        name= "The Wind that Shapes the Land", album_id=2, price=.99, track_num= 8,
        lyrics="""Somehow how I find myself standing on the edge of
        Something that I desperately need
        From this moment I will not be the same
        No more crying for the things I can't change

        Here I will put this tale to rest
        Finish what I started long ago
        And though it may not be the ending I wish
        Only victory can bring me home

        Come, I won't wait for long
        I was never your
        Slave for all eternity
        And now here we stand, face-to-face

        Feel the ground
        Crashing all around
        Fight to fan the flame
        Ignite the battle rage
        Tear the sky
        Watch the boulders fly
        As the mountainscape
        Crumbles in her wake

        So, you've come to prove yourself
        Despite the lies you tell
        You know you won't prevail
        And I, most powerful of all
        Have come to see you fall
        You'll find no mercy here

        Search within
        Uncover the will to win
        Turn against the tide that washes o'er
        Find the strength
        To fall and rise again
        Open up the gates, unleash the force

        I am the wind that shapes the land
        Old as time and twice as strong
        Oceans arise at my command
        I alone can carry on

        To break her chains

        Forward I push on into the storm surrounding me
        I await her strike
        Could it be she's reached the pinnacle now

        Silence as I stand within the eye
        In this hurricane of her design
        And watch as I drain the light from inside
        Now at last I see what must be done and so I fly

        Firm within my grasp I hold the spark and shatter it
        See her eyes go dark
        Could it be I've finally won the war now

        I see the clouds are gone
        The storm that raged is quiet once again
        I feel the stars above
        Shining on the fragments that remain

        Search within
        Uncover the will to win
        Turn against the tide that washes o'er
        Find the strength
        To fall and rise again
        Open up the gates, unleash the force

        I am the wind that shapes the land
        Old as time and twice as strong
        Oceans arise at my command
        I alone can carry on

        No, what is this I see
        Broken before me
        Once again I pay the price
        I've nothing without sacrifice"""
    )
    song025 = Song(
        # abyss by unleash the archers
        name= "Carry the Flames", album_id=2, price=.99, track_num= 9,
        lyrics="""All the time we had is wasted and gone
        And all I ask is one moment more
        Hold fast onto that flickering flame
        Or tell me what has all this been for

        But I need you to remember
        The power was in you all along

        You must remain despite all the pain
        And bring hope to those who have none
        Promise me you will be the one

        My guiding light
        Fire in the night
        I am with you, wherever you are
        Your guiding light, shining bright

        At last this aching comes to an end
        And finally I can set you free
        You will be the one to carry the flame
        Tell me that you'll do this for me

        But how can I remember
        When the power came from you all along

        And I can't deny that your strength is mine
        And without you all would be lost
        I can't bear to ever go on

        My guiding light
        Fire in the night
        I am with you, wherever you are
        Your guiding light, shining bright

        My guiding light
        Fire in the night
        I am with you, wherever you are
        Your guiding light, shining bright

        My guiding light
        Fire in the night
        I am with you, wherever you are
        Your guiding light, shining bright

        My guiding light
        Fire in the night
        I am with you, wherever you are
        Your guiding light, shining bright"""
    )
    song026 = Song(
        # abyss by unleash the archers
        name= "Afterlife", album_id=2, price=.99, track_num= 10,
        lyrics="""Facing the glory open before me
        Millions of light-years to roam
        For once in my life the journey is mine
        And I don't know which way to go
        Breaking the curse has given me purpose
        Charging into the unknown
        Choosing to right the wrongs far behind
        And forging a path of my own

        But with such power, think how you could rule
        Hold to your promise to watch over those in despair
        Why would you choose to serve when you could be master of all
        Be true to your honour and fight for a world that is fair

        Out of shadow, out of darkness
        Welcome to the light
        As the day shines boldly over night
        Follow me to finally be who you are inside
        Open wide, embrace the afterlife

        Don't waste your chance to seek revenge at last
        I won't waste my freedom
        Vengeance will not make me whole
        Fight back you fool
        Make them pay for transgressions past
        Fear not your anger
        Use it to rise up and free your soul

        Out of shadow, out of darkness
        Welcome to the light
        As the day shines boldly over night
        Follow me to finally be who you are inside
        Open wide, embrace the afterlife"""
    )



    song027 = Song(
        # time stands still by unleash the archers
        name= "Northern Passage", album_id= 10, price= .99, track_num= 1
    )

    song028 = Song(
        # time stands still by unleash the archers
        name= "Frozen Steel", album_id= 10, price= .99, track_num= 2,
        lyrics="""Beyond the tundra and past the sea
        A people have risen tall
        Soaring past the barriers
        that their kind have faced
        And driving them on
        A strength that can’t be stilled
        Tales have been told
        of how they won their home

        [Chorus:]
        Warriors, ungodly worshipers of cold
        Warriors, of ice and snow
        Warriors, the frozen north is where they ride
        Warriors, of ice and snow, of ice and snow

        Fight for what you believe, no one can take
        that which can not be held by the hand
        Honor and faith, the strongest armor
        Cry across distant hills
        Stand with your brothers in metal against tyranny
        Swords in the air; rise and vanquish

        Braving the northern winds
        To be on the front lines
        As soldiers unite, to carry the torch

        [Chorus 2x]

        Frozen north they roam
        Warriors of the ice and snow
        Of the ice and snow"""
            )

    song029 = Song(
        # time stands still by unleash the archers
        name= "Hail of the Tide", album_id= 10, price= .99, track_num= 3,
        lyrics="""Our vessel navigates over the ocean
Forcing its way through the waves
The wind has no command here, no
Hearts fiending for our destination
Searching the skies to the west
For signs of fair weather

Gone are all reflections on burdens
Left far beyond these sweet shores

[Chorus:]
Hey! Follow the sails, follow the wake, follow the blazing stars
Hey! Follow the wind, follow the fates, follow your heart

Seek passage safely through reefs to the harbor
Mooring the ship in the bay
The lights that welcome us burn bright
No words can express our elation
Oh how it's good to be home, back in this town again

Gone are all the memories of hardships
Endured whilst roaming the seas

[Chorus]

Long are the days spent away from this anchorage
Legends are all that remain when we depart again"""
    )

    song030 = Song(
        # time stands still by unleash the archers
        name= "Tonight We Ride", album_id= 10, price= .99, track_num= 4,
        lyrics="""Hold on to this moment for all time
This is the night we ride
I hear them calling our name
Raising the flag and fuelling the flame

I'll find my destination
Don't tell me where to go
I won't give in this time, feel the power
Not this time, scream it louder

[Chorus:]
Voyage o'er the mountains and wastelands
Far beyond the sea lies fortune

No regrets, just live for the fight
Renounce your precious lives and ride

Take hold of your steel chariot
Though ours is gone, lives on
Rise to the Challenge or fall
Nothing will hinder our rise to the call

We'll find our destination
Can't tell us where to go
We won't give in this time, feed the hunger
Not this time, growing stronger

[Chorus]

We'll find our destination; let's go!

[Chorus]

Fly, redeem tonight
Destroy, renounce your precious lives and ride"""
    )

    song031 = Song(
        # time stands still by unleash the archers
        name= "Test Your Metal", album_id= 10, price= .99, track_num= 5,
        lyrics="""Test your metal

You been around town with an original sound
And everyone knows who you are
All you really got is your name
But everybody loves you the same
The party don't start till you walk in the bar
And the crowd is waiting on you
As soon as they hit the lights, take flight
But there's not many places you can play
And all the faces stay the same
I'm not trying to say this town is lame
But it's time...

[Chorus:]
Test your metal!
Hot city nights, under city lights
We are the night

Trust me when I say to hit the road and escape
Can you hear them calling for you
Just try to take it day by day
The next town ain't so far away
There's a world outside
Lets take a ride
I'm not gonna say it again
Now's the only chance you got to rock
Don't let your dreams get away
Get up, go forth and make them scream…
It's time

[Chorus 2x]"""
    )

    song032 = Song(
        # time stands still by unleash the archers
        name= "Crypt", album_id= 10, price= .99, track_num= 6,
        lyrics="""Captured here within a quiet tomb
Yet not surrounded by the dead
Covered in a shroud of misery
Whispers hover in our midst
Ragged few have shared this consequence
But the choice was ours in a way
Full of hope, yet still despondent
Will light ever come again?

Shout, unfortunate warden
The time for chains is ended

[Chorus:]
Crawl out from this cage
Feel warmth upon your face
As you step into the sun
This tender breeze
Meant only for the free
Which you’ll not be for long
Your time is done

Dark passageways never end
Only glimpses caught between the
Bars of our cell, moving forward
Yet never terminating anywhere

Bound to the crypt
Darkness fills my soul and skin
Bound, I fall from sin
Blackened spirit, past within

The time for chains is ended

[Chorus]"""
    )

    song033 = Song(
        # time stands still by unleash the archers
        name= "No More Heroes", album_id= 10, price= .99, track_num= 7,
        lyrics="""They who hope for a savior
And stand idly by waiting for aid...
Will never rise above this merciless fate
Handed out to them deemed unworthy
Lowly pawn, move only when I say

Sheltered by ignorance, culled by naiveté
Cancerous words they all say, just get caught in the way

[Chorus:]
No more heroes, no more heroes
No more saviors, no more saviors
Waiting on you, you're all alone, so hopelessly

Now we know the story
of how they keep us blind to all they do
Drive us down underwater
Drown our hopes
Make us believe we're nothing without them

There's no standing in our way
Complete supremacy
Like puppets on a string
If you think you can remain
When all others have failed
Stand back and watch us reign

[Chorus]

Refuse me
Consequence will be your own undoing
Regret will permeate your soul
Exile yourself

Who are you to challenge us?
No one, just turn the other way
Go ahead I guarantee you'll fall
Not this time the game has changed
You think that you're special, you're not
You don't define us anymore
Just try your best to set yourself apart
We already are

[Chorus]"""
    )

    song034 = Song(
        # time stands still by unleash the archers
        name= "Dreamcrusher", album_id= 10, price= .99, track_num= 8,
        lyrics="""
Come; follow your soul, onto hope
Heed not the words others throw
For the heart is the strongest of all
Only fear can defeat what is right
And you can't let it swallow your mind

But I don't want to feel
that we've wasted our lives
When we're holding our hearts in our hands
And the terror it looms in our sights

Tomorrow this fight will tear us from the sky
To follow the path to the rest of our lives
Someday we'll find the truth of what's been said
Find a way to reconcile the lies we're fed

This fight is noble, can't afford our freedom
Not like the ones who can't admit what we all know

For the fallen must arise, a phoenix from the fire
Carried on the wind, this new crusade begins

No more chains, I refuse to play the games
Never kneel again
To words others say
When they tell us how to be
Find the strength to break the lines of fate

Can you feel it lurking deep within
I can feel it, striving to begin
Can you feel it something has to give
I can feel it rising up again

[Chorus]
Go on have your share
No one can stand in your way
Who said nothing's fair
I say now's the time to take

When the dust settles
The silence brings relief
From all the constant cries
of entitlement and greed

Can you dare to stand apart
And finish what you start
United on the path, rise up and resist

Through bone and ash
I see the light in the eyes
Broken inside, Dreamcrusher
We won't go, with the dead
All we know, never said

Kill the noise, raise your voice

Can you feel it lurking deep within
I can feel it, striving to begin
Can you feel it something has to give
I can feel it rising up again

[Chorus 2x]

This world is a Dreamcrusher"""
    )

    song035 = Song(
        # time stands still by unleash the archers
        name= "Going Down Fighting", album_id= 10, price= .99, track_num= 9,
        lyrics="""Come on
You're the one that brought us here
I can't believe what you say
Tell me you're kidding
Hell no, you're not gonna leave us stranded here
No way, you've ruined everything
Can't you see we're lost without you
Though we hate to say
There's so much at cost
You know it's true
And you can only take

Oh, we've heard it all before
And now we'll hear it once again

Take your cut and go
Leave us out in the cold
You can never get away
Not this time

[Chorus:]
Going down fighting [4x]

If you never want us to return again
That's fine with me
Not gonna stand for thievery
I know, you probably think that
You're gonna get away with your little game
But rules are made for breaking
Can't you see we're lost
There's so much at cost

Oh we've heard it all before
And now we'll hear it once again
Stop this lying to yourself
You're crying to an empty floor
And we are not to blame
Stop denying

[Chorus 3x]"""
    )

    song036 = Song(
        # time stands still by unleash the archers
        name= "Time Stands Still", album_id= 10, price= .99, track_num= 10,
        lyrics="""
[Chorus:]
Abandon this sun
What's done is done
And time will go on and on
It won't be long
We will come
And time will go on and on

Hold on, though it seems that the end
it is now upon us
Fear not the fall
Rise up, we will find there's a way
For us to carry on
For once and for all

Fortune's favor is ours now
Ride to glory

Stand with us, be the one that will lead them
When the night is over, answer the call
Rebuild, history can only be written
By the victors, and we will write it all
Break through, when the walls have fallen
And the ash has lifted, light will come
Gather now, we have risen on the winds
of our transformation, we finally have won

[Chorus]"""
    )



    song037 = Song(
        # Apex by Unleash The Archers
        name="Awakening", album_id=3, price=0.99, track_num=1,
        lyrics="""To look up into the night's sky
To see the stars they are changed
To know a thousand years or more have passed, and I am still the same
This mountain hollow that keeps me in a suffocation embrace
A prison and a safe haven, it's always been this way

Lo, a new master calls me to awakening
I know this one brings the end
Far out beyond the darkness I've been living in
It's true, a whole new world awaits

Stellar constellations rise, lighting my way in the night
Once again revitalized, to roam; to never die

My path begins with the new dawn
A voice is calling my name
It always starts as whispering then manifest to a scream
I'm dawn to the creature that wakes me
Bound to them by the curse
My soul exists only to serve, a covenant of birth

Fear not the task ahead there's no escaping it
There's no good nor evil here

Stellar constellations rise, lighting my way in the night
Once again revitalized, to roam; to never die

Come to me, awakening
Follow my voice, come to me

Fear not the task ahead there's no escaping it
There's no good nor evil here

Stellar constellations rise, lighting my way in the night
Once again revitalized, to roam; to never die
"""
    )

    song038 = Song(
        # Apex by Unleash The Archers
        name="Shadow Guide", album_id=3, price=0.99, track_num=2,
        lyrics="""I wander aimlessly still reeling from the change
Waiting for a sign or for a spectre
That can guide me on my way
Often times a watcher waits for me
My days are passing under skies I cannot read

Until a silhouette wings silently above
Circling the ahead and giving me the sense that he's the one
A falcon cries, echoing inside of me and ushering the tide

Finally you found me

Shadow guide, you lead me to horror
Shadow guide, you harbour destiny

Nowhere to hide, dark wings enfolding over me
I can't escape, I can't defeat, shadow guide

Though I know you navigate me to the chains
Of the one who'll use me to do wrong
I can't help but follow your wake

Shadow guide, you lead me to horror
Shadow guide, you harbour destiny

Shadow guide, you lead me to horror
Shadow guide, you harbour destiny"""
    )

    song039 = Song(
        # Apex by Unleash The Archers
        name="The Matriarch", album_id=3, price=0.99, track_num=3,
        lyrics="""Come gather around the fire
        I'll tell you all a tale
        The day she came to power
        Our lives forever changed

        Never before a darkness like this have we seen
        No end to suffering
        All hail our mighty queen

        There's no hiding from her
        She sees everything
        Rules with the iron fist
        You know she is the matriarch

        She'll eat your heart

        I've heard it said
        That she can melt you with her eyes
        And out her fingers spits a burning liquid fire

        Without a single word you'll fall under her spell
        And rip yourself apart with your bare hands
        While marching to her bell

        There's no rising above
        She drowns everything
        Freedom doesn't exist
        You can't resist

        The matriarch

        You won't get far

        Oh, she brings nightmares to life
        The foulmost twisted kind
        And when you beg to die
        She glorifies

        The matriarch [2x]"""
    )

    song040 = Song(
        # Apex by Unleash The Archers
        name="Cleanse The Bloodlines", album_id=3, price=0.99, track_num=4,
        lyrics="""Here you are, you've finally come
You're mine, at last! I've waited so long
Listen well, this is why you are here
I need you to find my sons

Journey wide they're spread across the land
They will hide they know what I plan
My sons were born for one purpose only
Their blood my elixir of life

Return them alive, I'll kill them myself
I'll open their throats and drink from their skulls
The ritual is very precise
Bring them to me before the planets align

The altars wait in silence, an effigy
Soon their purpose divined
Blood will run as rivers upon them
The time has come to

Cleanse the bloodlines, free me from the clutch of
Death incarnate, my reign must never end

Unearth my descendants, find them and bring them to me
Feed my insatiable lust for blood

I can give what you've longed for your whole life
Freedom from this earthly tie
Know this in your heart of hearts
Betray me and spend eternity as mine

Cleanse the bloodlines, free me from the clutch of
Death incarnate, my reign must never end"""
    )

    song041 = Song(
        # Apex by Unleash The Archers
        name="The Coward's Way", album_id=3, price=0.99, track_num=5,
        lyrics="""So now it has begun, seems easy enough
I haven't to go far away to find the eldest son
He cannot hide from me; his friends won't shield him now
It doesn't matter who you are your tower's coming down

Your ruin has arrived, politician's lives are like the tide
You had to know that I would come for you
Hear the Matriarch, she needs your heart, you know it's true

Fallen from on high, forsaken lies
You can't resist the chance to beg and scream
Out for mercy, I'll drag you out
The coward's way, down on your knees

Don't bother with the scheme, there's no beguiling me
You're just another job that's to be done before I'm free
Your time is at an end, enough with bargaining
Your seat of power is vacated for someone else

To hide the truth away,
To take all that there is, to never give, you're all the same

Fallen from on high, forsaken lies
You can't resist the chance to beg and scream
Out for mercy, I'll drag you out
The coward's way, down on your knees

Down on your knees, I'll drag you out

Fallen from on high, forsaken lies
You can't resist the chance to beg and scream
Out for mercy, I'll drag you out
The coward's way
Forfeit all you own, abandon hope
She's called you back; the altar waits for you
No time to waste, you cry in vain
I won't let you go; fight me no more"""
    )

    song042 = Song(
        # Apex by Unleash The Archers
        name="False Walls", album_id=3, price=0.99, track_num=6,
        lyrics="""To the south there's a city, ruled by a serpent-tongue
Spinning his lies and tales, blinding everyone
When I come to end this tyrant, he spouts words of silken twine
Winding me in vapours, mystifying, clouding up my mind

Then I recall words of warning said by my master
Never allow for his enchantments to penetrate
Know his weakness is my strength; overcome this haze

Overlord your reign is at an end
Your false walls are crumbling within
Oppressor your spell has come undone
Defy no more, impostor, overlord

Once I see through the veil he has conjured out of dust
Trapping his followers in a world they cannot trust
Like a curtain hangs his doctrine, enslaving all who hear
I must destroy this web, free the people, alleviate their fear

As though a fog has been lifted, cries echo around us
And like his brother before him I feel no remorse
He will lie upon the altar, a well-deserving course

Overlord your reign is at an end
Your false walls are crumbling within
Oppressor your spell has come undone
Defy no more, impostor, overlord

You conjure your false walls
Impostor, you surround us
Your serpent tongue is enslaving everyone
Oppressor, overlord
Your doctrine, just vapours
Your lies are leading the lost
I will end you here"""
    )

    song043 = Song(
        # Apex by Unleash The Archers
        name="Ten Thousand Against One", album_id=3, price=0.99, track_num=7,
        lyrics="""Ten thousand against one…

Misty fields before me; forces assembled here still wander in their dreams
Bloodshed forthcoming with the dawn, a burning horizon beyond

Behold!
I have arrived, time for war
Gather your shields and your swords
Try as you might to defeat me
I come as the wind, laying to waste all who dare stand in my way
Why risk your lives when there's only one I need

Retreat!
He's using you so he can live
Where is the honour in this?
It's needless to die, I won't stop until I win
End all the cowardice now!
Boy, I know you're there, you hide behind a wall of men
Your army, it cannot defend if you won't lead them

Ten thousand against one
They will rise, ten thousand against one
I'll stand my ground, ten thousand against one

See the spirits lifting, drifting upon the wind, their bodies left behind
Echoing screams still remain heavy on the breeze, and whisper through the trees

Silence, follows me
A thousand voices calling
My name, Immortal
You can't run from your fate

[3x]
Ten thousand against one
They will rise, ten thousand against one
I'll stand my ground, ten thousand against one"""
    )

    song044 = Song(
        # Apex by Unleash The Archers
        name="Earth And Ashes", album_id=3, price=0.99, track_num=8,
        lyrics="""Calling out
I'm haunted again
The consequences far beyond repair

I know he's waiting for me, I can feel him watching
The sound is deafening, begging me to walk the other way
But I cannot show mercy, no matter how deserving
There's no controlling fate, he was made to die for nothing

Let it go, no hesitating
Take him home, no point crying
He's no wasted life; open your eyes

Earth and ashes, when I'm gone will still remain
Fear not forever, I will wander once again

He takes me out to the hills, we're like old friends walking
But it's a charade, both of us know there's no other way
All despite what I'm feeling, he's such a wise companion
But I'm just wasting time, he will die

He's no wasted life; open your eyes

And I know you've come to take me home
I can't pretend that I want to go
But I know that death it comes for everyone of us
And I've lived a worthy life with no remorse

Earth and ashes, when I'm gone will still remain
Fear not forever, I will wander once again"""
    )

    song045 = Song(
        # Apex by Unleash The Archers
        name="Call Me Immortal", album_id=3, price=0.99, track_num=9,
        lyrics="""Despite the promise made to me to let my soul be free
Revealing upon my return intentions to betray
Yet all the same the fact remains I knew it was a lie
In all these years I've learned to hope is no way to survive

The ritual completed now she has what she demands
And I'm just another pawn for her to do as she commands

Now I return to the mountain keep
Slumber again for eternity
Call me Immortal

The world no longer my concern I wander home in peace
No sense at all in lingering, my chamber calls to me
If ever I was done with life; this last one caused me pain
And here I thought I had control of everything

The future hovers on the edge in the hands of one insane
My power is the tipping point and now she knows my name

[3x]
Now I return to the mountain keep
Slumber again for eternity
Call me Immortal"""
    )

    song046 = Song(
        # Apex by Unleash The Archers
        name="Apex", album_id=3, price=0.99, track_num=10,
        lyrics="""
        Hello mountain, remember me
        Child of your womb
        I return from a perilous place
        To the warmth of your hollow
        Embrace me
        Steady giant, monolith
        Lend me your heart
        I am weakened again, tired
        Mend my scars

        As your power, it sinks into me
        Your roots take their hold
        My body as one with the earth
        My blood as the stone
        The mountain, my home

        Heavy walls enclose me; cover me in endless warmth
        And now the dreams will come
        Lucid freedom takes me, to a world no longer run by the laws of relativity

        Fly out beyond the stars, where the wind takes me
        Away and leads me through the dark, defying gravity

        Can you follow me? Follow me to apex

        Through a meadow running, feel the sun upon my face
        And the air in intoxicates
        Rushing like a river, toward a waterfall that takes me out beyond reality

        Away, you lead me through dark, defying gravity

        [2x]
        Can you follow me? Follow me to apex

        Brother mountain, now we sleep
        For a thousand years
        I will see you again
        Something is coming…
        Coming for me…"""
            )
    song047 = Song(
        # Caníbal by Accidente
        name="Desmesura", album_id=4, price=.99, track_num=1
    )
    song048 = Song(
        # Caníbal by Accidente
        name="Hablar de lxs muertxs", album_id=4, price=.99, track_num=2
    )
    song049 = Song(
        # Caníbal by Accidente
        name="Demonio", album_id=4, price=.99, track_num=3
    )
    song050 = Song(
        # Caníbal by Accidente
        name="Colze a colze", album_id=4, price=.99, track_num=4
    )
    song051 = Song(
        # Caníbal by Accidente
        name="Caníbal", album_id=4, price=.99, track_num=5
    )
    song052 = Song(
        # Caníbal by Accidente
        name="Lo que importa", album_id=4, price=.99, track_num=6
    )
    song053 = Song(
        # Caníbal by Accidente
        name="La mataron", album_id=4, price=.99, track_num=7
    )
    song054 = Song(
        # Caníbal by Accidente
        name="Luchar", album_id=4, price=.99, track_num=8
    )
    song055 = Song(
        # Caníbal by Accidente
        name="La culpa", album_id=4, price=.99, track_num=9
    )
    song056 = Song(
        # Caníbal by Accidente
        name="Vuestra historia", album_id=4, price=.99, track_num=10
    )

    song057 = Song(
    # Chapter III: Downfall by Ad Infinitum
    name="Eternal Rains", album_id=5, price=.99, track_num=1
    )
    song058 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Upside Down", album_id=5, price=.99, track_num=2
    )
    song059 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Seth", album_id=5, price=.99, track_num=3
    )
    song060 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="From The Ashes", album_id=5, price=.99, track_num=4
    )
    song061 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Somewhere Better", album_id=5, price=.99, track_num=5
    )
    song062 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="The Underworld", album_id=5, price=.99, track_num=6
    )
    song063 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Ravenous", album_id=5, price=.99, track_num=7
    )
    song064 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Under The Burning Skies", album_id=5, price=.99, track_num=8
    )
    song065 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Architect Of Paradise", album_id=5, price=.99, track_num=9
    )
    song066 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="The Serpent's Downfall", album_id=5, price=.99, track_num=10
    )
    song067 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="New Dawn", album_id=5, price=.99, track_num=11
    )
    song068 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Legends (Featuring Chrigel Glanzmann)", album_id=5, price=.99, track_num=12
    )
    song069 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Upside Down (Instrumental)", album_id=5, price=.99, track_num=13
    )
    song070 = Song(
        # Chapter III: Downfall by Ad Infinitum
        name="Somewhere Better (Instrumental)", album_id=5, price=.99, track_num=14
    )

    song071 = Song(
    # The Saberlight Chronicles by Fellowship
    name="Until The Fires Die", album_id=6, price=.99, track_num=1
    )

    song072 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Atlas", album_id=6, price=.99, track_num=2
    )

    song073 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Glory Days", album_id=6, price=.99, track_num=3
    )

    song074 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Oak And Ash", album_id=6, price=.99, track_num=4
    )

    song075 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Hearts Upon The Hill", album_id=6, price=.99, track_num=5
    )

    song076 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Scars And Shrapnel Wounds", album_id=6, price=.99, track_num=6
    )

    song077 = Song(
        # The Saberlight Chronicles by Fellowship
        name="The Hours Of Wintertime", album_id=6, price=.99, track_num=7
    )

    song078 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Glint", album_id=6, price=.99, track_num=8
    )

    song079 = Song(
        # The Saberlight Chronicles by Fellowship
        name="The Saint Beyond The River", album_id=6, price=.99, track_num=9
    )

    song080 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Silhouette", album_id=6, price=.99, track_num=10
    )

    song081 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Still Enough", album_id=6, price=.99, track_num=11
    )

    song082 = Song(
        # The Saberlight Chronicles by Fellowship
        name="Avalon", album_id=6, price=.99, track_num=12
    )
    song083 = Song(
        # The Armor of Ire by Eternal Champion
        name="I Am The Hammer", album_id=7, price=.99, track_num=1,
        lyrics="""I AM THE HAMMER

From the west I hear the riders of Tarsul have gone into the north, they join Haiklan in war. Let both rise up to meet my army, they are battle-starved and I promised them feast upon two nations blood.

For I am not to be crossed.
I command the Guards of Lourn.
I am The Hammer.

In the south Kynara forms her ranks 8000 strong, to meet the demon priests of ill Nitaar. I've warned them once I am The Hammer, they are like glowing iron. No sorcery can force the Pyre Forge!

I am not to be crossed.
I command the Guards of Lourn.
I am The Hammer.

Over the peaks frost-bitten riders of Tarsul have come. Haiklan has joined them at their own demise. Farick, I ask my steel is tempered true and armor-strong, I've forged our brands in rites of Pyre Forge.

I am not to be crossed.
I command the Guards of Lourn.
I am The Hammer."""
    )

    song084 = Song(
        # The Armor of Ire by Eternal Champion
        name="The Armor of Ire", album_id=7, price=.99, track_num=2,
        lyrics="""THE ARMOR OF IRE

Tyrant!
Suffer now for the crime an age before. In your shadowed keep you fear the gathering storm. For your slander I repay. An ocean I'd cross, through sands I would ride for my right to bring my wrath upon...
Tenfold.
The pain you serve will be brought upon your own. Forseers warned a false and guarded tongue would serve you well, they're right! They are the harbors of peace but no peace will be had tonight. An oath is sworn in blood and scorn.

Nightmares.
Your pillared halls offer quarter in the night, but no rest, it haunts those when their honor falls. By the dawn you'll pay the price, for an ocean I've crossed, through sands I have rode for my right to bring my wrath upon.....
Blinded, there is a fire but I cannot see the light. It's burned to ash all that which lived before. For the fallen I repay, reborn in revenge, justice for bonds betrayed. An oath is sworn in blood and scorn.

No force will heed my pace, and no iron will rend my flesh before I can deal you a traitor's fate. My ire is my armor.

No force will heed my pace, and no iron will rend my flesh before I can deal you this traitor's fate. My ire is my armor."""
    )

    song085 = Song(
        # The Armor of Ire by Eternal Champion
        name="The Last King Of Pictdom", album_id=7, price=.99, track_num=3,
        lyrics="""
THE LAST KING OF PICTDOM

They know who they've tread upon, and they still meet our battle call.
Atlantean wolves, they fight, let hawks clean their bones!

Crossed blades of iron await their faulting weary hordes.
We've claimed the Highlands, ours by right and ours alone.
The light is falling, no dawn for Roman dogs.
The last king of Pictdom leads a clan across the moor.

Bring forth those who'd conquer.
Light flames for them to see.
Their heads will hang from my hand.
This reign can never be.

Forced south they're hiding. They have heard our drums of war.
They'd claim the island, but can't take our northern hold.
The light is falling, no dawn for Roman dogs.
The last king of Pictdom leads his clan across the moor!

Bring forth those who'd conquer.
Light flames for them to see.
Their heads will hang from my hand!
This reign can never be.

Cry in the night. The last of them dies and I feel the calm hush in the night.
The silence is broken by wolves of the fight.
Dark turns to light, and the blood of the fools is stained to the stone. Hush in the night...the silence is broken by wolves of the fight.

The know who they've tread upon. And they still meet our battle call.
Atlantean wolves, they fight and let hawks clean their bones."""
    )

    song086 = Song(
        # The Armor of Ire by Eternal Champion
        name="Blood Ice", album_id=7, price=.99, track_num=4
    )

    song087 = Song(
        # The Armor of Ire by Eternal Champion
        name="The Cold Sword", album_id=7, price=.99, track_num=5, lyrics="""THE COLD SWORD

A name is called and I'm thrown into a world draped in ice. The Frozen Keep is my dominion? The Champion's fate, to wake in worlds anew.

The Southern Ice, the white unbroken. The cardinal red sun is dying. To Rowenarc, the obsidian citadel.

"The hilt of the sword and the hand are as one."
The chalice screams, and demands of me what I loathe.
"The blade of the sword has the blood of the Sun."
Pawn of Fate, your glory and doom are one.

A maddened king will lead his men to ruin, the warriors of silver are caught. For their queen, they'll battle, but they've no hope from The Black Sword.

Always a price, always a burden. The balance right, the chalice now full. Many names, Fate's Soldier, I will find Tanelorn!

"The hilt of the sword and the hand are as one."
The chalice screams, and demands of me what I loathe.
"The blade of the sword has the blood of the Sun."
Pawn of Fate, your glory and doom are one.

From the fallen Moon they will ride. Under the blade the queen she will die.
From the Scarlet Fjord they will ride. Under the blade the queen she will die.
The fief of the sword is your life."""
    )

    song088 = Song(
        # The Armor of Ire by Eternal Champion
        name="Invoker", album_id=7, price=.99, track_num=6, lyrics="""
INVOKER


It's by mercy alone, that I cannot recount. The memories fade and I weaken. A glimpse of old things, vile and cruel, haunting my dreams when I doze. The Spawn of Stars, Cthulhu and kin, invoked by a cult. In their folly they called the ones who would trample and crawl upon Earth, now their own.

Then I beheld Kadath and it's cloud-hidden peak.
And I beheld the Crawling Chaos beneath.
They kneel 'fore the invoker.
The Old Ones, awakened again.

The days are a fog, the misty unreal. I wait for the night and my ruin. Of vistas strange and lands passing below the shantak I ride when I doze. I hear Atal and Nyarlathotep, and the chanting of one I would slaughter. He speaks the name, from Leng he invokes the Old Gods, the Old Ones.

Then I beheld Kadath and it's cloud-hidden peak.
And I beheld the Crawling Chaos beneath.

Before he raises The Goat and Her Thousand. Before he calls the ones he cannot put back, I will attack. Before The Deep Ones come rising and crawling, Before he calls the ones he cannot put back, I will attack. They kneel 'fore the invoker.
The Old Ones, awakened again.

The moment has come, the horror unreal. They wait at the gate, but I see them. And in my mind I will always recall the sound of the Gods as they rose. I hear him call and a horrendous reply, the chanting will bring his own slaughter. The dagger shines in the hand of the fool, and I throw my own in his heart.

They kneel 'fore the invoker.
The Old Ones, awakened again.
Smite the invoker!"""
    )

    song089 = Song(
        # The Armor of Ire by Eternal Champion
        name="Sing A Last Song Of Valdese", album_id=7, price=.99, track_num=7, lyrics="""SING A LAST SONG OF VALDESE

Into the vale beneath the autumn ridges flows the Cotras. It cuts it's way to Raven's Eyrie's door. Under the strange moon the night winds mock the Sun. The hound is baying for his master Demonlord.

Ever the rider, ever the foe. The name of Kane forever known. By spell or by steel the brazen fall. Bear the curse and bear the time. The Seven Nameless hear thy cry. The Grey Lord and not Thoem will have your soul.

Valdese by revenge your soul can be as one. No longer must you stalk among the nighted boles. Seven times seven, the Grey Lord will return, and carry back with him the soul which he has won.

Wherever Kane has walked, a trail of crimson would follow now. Cursed by Theom! He will tread through the ages until the treasures of kings turn to dust, and the flesh of all men falls from their time-eaten bones. Lord Tloluvin, Sathonys, wait an age for the one that will not die!

In a tower of stone there burns a fire. The pain of steel for any who'd cross. The fatal eyes, weaken the brave. Horror met by the rushing of his blade. Lord Tloluvin, Sathonys, wait an age for the one that would not die. The hunting hound, the Demonlord, mark him by the strange hilt of his sword.

Ever the rider, ever the foe, the name of Kane forever known. By spell, or by steel, the brazen fall.

Valdese by revenge your soul can be at one. No longer must you stalk among the nighted boles. Seven times seven, the Grey Lord will return....."""
    )

    song090 = Song(
        # The Armor of Ire by Eternal Champion
        name="Shade Gate", album_id=7, price=.99, track_num=8
    )
    song091 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="El Final", album_id=8, price=.99, track_num=1
    )

    song092 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="500 Muertos", album_id=8, price=.99, track_num=2
    )

    song093 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="La Bomba del Islami", album_id=8, price=.99, track_num=3
    )

    song094 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Sigue Vivo", album_id=8, price=.99, track_num=4
    )

    song095 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Autolesionarse", album_id=8, price=.99, track_num=5
    )

    song096 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Circo Roma", album_id=8, price=.99, track_num=6
    )

    song097 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Mujer Rubia, Hombre Moreno*", album_id=8, price=.99, track_num=7
    )

    song098 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Lobos", album_id=8, price=.99, track_num=8
    )

    song099 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Hostal Osona", album_id=8, price=.99, track_num=9
    )

    song100 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Traga, Mastica, Vomita", album_id=8, price=.99, track_num=10
    )

    song101 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Lunes Otra Vez", album_id=8, price=.99, track_num=11
    )

    song102 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Triste Pero Cierto", album_id=8, price=.99, track_num=12
    )

    song103 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Kurva", album_id=8, price=.99, track_num=13
    )

    song104 = Song(
        # Pesadilla Adulta by Juanita y Los Feos
        name="Paleto", album_id=8, price=.99, track_num=14
    )
    song105 = Song(
    # Nueva Numancia by Juanita y Los Feos
    name="Vallecas", album_id=9, price=.99, track_num=1
)

    song106 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Escupe en la tumba", album_id=9, price=.99, track_num=2
    )

    song107 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Vacío", album_id=9, price=.99, track_num=3
    )

    song108 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="1816", album_id=9, price=.99, track_num=4
    )

    song109 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Cien puñaladas", album_id=9, price=.99, track_num=5
    )

    song110 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Nunca volverán", album_id=9, price=.99, track_num=6
    )

    song111 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Me arrancaría los ojos", album_id=9, price=.99, track_num=7
    )

    song112 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="No debería", album_id=9, price=.99, track_num=8
    )

    song113 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="En la casa de tu madre", album_id=9, price=.99, track_num=9
    )

    song114 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Revolución caníbal", album_id=9, price=.99, track_num=10
    )

    song115 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Noche más negra", album_id=9, price=.99, track_num=11
    )

    song116 = Song(
        # Nueva Numancia by Juanita y Los Feos
        name="Se ha acabado", album_id=9, price=.99, track_num=12
    )

    db.session.add_all([
        song001, song002, song003, song004, song005, song006, song007, song008, song009, song010, song011, song012, song013, song014, song015, song016, song017, song018, song019, song020, song021, song022, song023, song024, song025, song026, song027, song028, song029, song030, song031, song032, song033, song034, song035, song036, song037, song038, song039, song040, song041, song042, song043, song044, song045, song046, song047, song048, song049, song050, song051, song052, song053, song054, song055, song056, song057, song058, song059, song060,  song061, song062, song063, song064, song065, song066, song067, song068, song069, song070, song071, song072, song073, song074, song075, song076, song077, song078, song079, song080, song081, song082, song083, song084, song085, song086, song087, song088, song089, song090, song091, song092, song093, song094, song095, song096, song097, song098, song099, song100, song101, song102, song103, song104, song105, song106, song107, song108, song109, song110, song111, song112, song113, song114, song115, song116,
        # song117, song118, song119, song120, song121, song122, song123, song124, song125, song126, song127, song128, song129, song130, song131, song132, song133, song134, song135, song136, song137, song138, song139, song140, song141, song142, song143, song144, song145, song146, song147, song148, song149, song150, song151, song152, song153, song154, song155, song156, song157, song158, song159, song160, song161, song162, song163, song164, song165, song166, song167, song168, song169, song170, song171, song172, song173, song174, song175, song176, song177, song178, song179, song180, song181, song182, song183, song184, song185, song186, song187, song188, song189, song190, song191, song192, song193, song194, song195, song196, song197, song198, song199, song200
])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
