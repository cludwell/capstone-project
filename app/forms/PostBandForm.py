from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField, BooleanField
from wtforms.validators import DataRequired

class PostBandForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    banner_url = FileField('banner_url', validators=[DataRequired()])
    artist_image = FileField('artist_image', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    genres = StringField('genres', validators=[DataRequired()])
    background_image = FileField('background_image')
    tiled = BooleanField('tiled')
    background_color = StringField('background_color')
    background_color_secondary = StringField('background_color_secondary')
    text_color = StringField('text_color')
