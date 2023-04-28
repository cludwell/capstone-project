## WHAT IS FANCAMP?

### ABOUT

Fancamp is a clone of bandcamp, with more of a metal music theme, built as a capstone project for my studies with App Academy. Building it has been a great learning experience about building a streaming service with social media aspects, that also allows a great deal of personalization. Bandcamp is a deceptively complex website. Moving forward as I prepare Fancamp to be a portfolio project I hope to incorporate more and more features.

Fancamp is currently hosted publicly at
https://fancamp.onrender.com


### TECHNOLOGIES

Technologies used to build this app include

click = "==8.1.3"
gunicorn = "==20.1.0"
itsdangerous = "==2.1.2"
python-dotenv = "==0.21.0"
six = "==1.16.0"
alembic = "==1.9.2"
python-dateutil = "==2.8.2"
python-editor = "==1.0.4"
greenlet = "==2.0.1"
flask = "==2.2.2"
flask-cors = "*"
flask-login = "==0.6.2"
flask-migrate = "==4.0.2"
flask-sqlalchemy = "==3.0.2"
flask-wtf = "==1.1.1"
jinja2 = "==3.1.2"
mako = "==1.2.4"
markupsafe = "==2.1.2"
sqlalchemy = "==1.4.46"
werkzeug = "==2.2.2"
wtforms = "==3.0.1"
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "react-scripts": "^4.0.3",
    "redux": "^4.1.0",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0"

### LAUNCHING APP

To launch the app locally open two terminals.
In the first enter in the terminal 'flask run' to initiate the backend server.

In the second terminal cd into the 'react-app' directory and enter 'npm start' in the terminal to begin the front end server. This will get the app hosted locally.

Otherwise, you can use the app at
https://fancamp.onrender.com

### BACKEND ROUTES

Albums
-Get all albums
-Delete by ID
-Get by ID
-Put by ID
-Post song by Album ID
-Edit song by Album and song id

Authentication
-authenticate
-login
-logout
-signup

Bands
-Get by id
-Delete by id
-Put by ID
-Get all bands
-Post band

Purchases
-Get user purchases
-Get all purchases

Songs
-Delete by ID

Wishlist
-Delete by ID
-Get by user id
-Delete all by user id
-Post wished item

### REDUX STATE SHAPE

```{
    session: {
        user: {}
    },
    albums: {
        singleAlbums: {},
        allAlbums: {}
    },
    purchases: {
        userPurchases: {},
        allPurchases: {}
    },
    bands: {
        singleBands: {},
        allBands: {}
    },
    users: {
     ...users
    },
    songs: {
        allSongs: [...]
    },
    wishlists: {
        userWishes: {}
    }
}
```
### ABOUT THE CREATOR

To learn more about me, please reach out and network. Looking forward to programming with you!

```['Christian Ludwell',
        'https://www.linkedin.com/in/christian-ludwell-047b18247/',
        'https://github.com/cludwell']
```
