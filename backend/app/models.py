from . import db

class Team(db.Model):
    team_name = db.Column(db.Text, primary_key=True)
    registration_date = db.Column(db.Date)
    group_number = db.Column(db.Integer)
    match_points = db.Column(db.Integer, default=0)
    alt_match_points = db.Column(db.Integer, default=0)
    goals = db.Column(db.Integer, default=0)
