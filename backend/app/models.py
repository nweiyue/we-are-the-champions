import winsound
from . import db

class Team(db.Model):
    teamName = db.Column(db.Text, primary_key=True)
    registrationDate = db.Column(db.Date)
    groupNumber = db.Column(db.Integer)
    wins = db.Column(db.Integer, default=0)
    loss = db.Column(db.Integer, default=0)
    ties = db.Column(db.Integer, default=0)
    goalsScored = db.Column(db.Integer, default=0)
