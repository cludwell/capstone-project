from flask_wtf import FlaskForm
from wtforms import StringField, URLField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class PostAlbumForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    album_image = StringField('album_image', validators=[DataRequired()])
    genre = StringField('genre', validators=[DataRequired()])
    band_id = IntegerField('band_id', validators=[DataRequired()])
    youtube = StringField('youtube')
