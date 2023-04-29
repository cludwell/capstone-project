from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class PurchaseForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_id = IntegerField('album_id', validators=[DataRequired()])
    price = IntegerField('price')
