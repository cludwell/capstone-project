from flask_wtf import FlaskForm
from wtforms import StringField, URLField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class PostBandForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    banner_url = StringField('banner_url', validators=[DataRequired()])
    artist_image = StringField('artist_image', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    genres = StringField('genres', validators=[DataRequired()])
