from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, DecimalField, IntegerField, FileField
from wtforms.validators import DataRequired

class PostSongForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    lyrics = TextAreaField('lyrics')
    price = DecimalField('price')
    track_num = IntegerField('track_num', validators=[DataRequired()])
    url = FileField('url')
    album_id = IntegerField('album_id', validators=[DataRequired()])
