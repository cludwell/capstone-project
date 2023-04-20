from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from .users import seed_users, undo_users
from .albums import seed_albums, undo_albums
from .carts import seed_carts, undo_carts
from .wishlists import seed_wishlists, undo_wishlists
from .purchases import seed_purchases, undo_purchases
from .bands import seed_bands, undo_bands
from .songs import seed_songs, undo_songs

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_songs()
        undo_purchases()
        undo_wishlists()
        undo_carts()
        undo_albums()
        undo_bands()
        undo_users()
    seed_users()
    seed_bands()
    seed_albums()
    seed_carts()
    seed_wishlists()
    seed_purchases()
    seed_songs()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_songs()
    undo_purchases()
    undo_wishlists()
    undo_carts()
    undo_albums()
    undo_bands()
    undo_users()
    # Add other undo functions here
