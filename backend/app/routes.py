from flask import Blueprint, request, jsonify
from .models import Team
from datetime import datetime
from . import db

routes = Blueprint('routes', __name__)

@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    team_name = data.get('teamName')
    registration_date = data.get('registrationDate')
    group_number = data.get('groupNumber')
    err_msg = ""
    date = datetime.now()

    team = Team.query.filter_by(team_name=team_name).first()
    if team:
        err_msg = f"There already exist a team called {team_name}."
    elif not group_number.isdigit():
        err_msg = "Group number must be a number."
    else:
        date_str = registration_date.split('/')
        if len(date_str) == 2 and len(date_str[0]) == 2 and len(date_str[1]) == 2:
            try:
                date = datetime.strptime(registration_date, "%d/%m")
            except ValueError:
                err_msg = "Invalid date format."
                return jsonify({'message': err_msg}), 500
        else:
            err_msg = "Invalid date format."
    
    if err_msg != "":
        return jsonify({'message': err_msg}), 500
    else:
        group_number = int(group_number)
        team = Team(team_name=team_name, registration_date=date, group_number=group_number)
        db.session.add(team)
        db.session.commit()
        return jsonify({'message': "Team added successfully!"}), 200

@routes.route('/results', methods=['POST'])
def upload_results():
    data = request.get_json()
    team1 = data.get('team1')
    team2 = data.get('team2')
    goals1 = data.get('goals1')
    goals2 = data.get('goals2')
    print(data)

    err_msg = ""

    t1 = Team.query.filter_by(team_name=team1).first()
    t2 = Team.query.filter_by(team_name=team2).first()
    if team1 == team2:
        err_msg = f"The 2 teamnames must be different."
    elif not t1 or not t2:
        err_msg = f"Both of teams must be registered"
    elif not goals1.isdigit() or not goals2.isdigit():
        err_msg = "Goals scored must be a number."
    elif t1.group_number != t2.group_number:
        err_msg = "Both teams must be in the same group."
    
    if err_msg != "":
        return jsonify({'message': err_msg}), 500
    else:
        goals1 = int(goals1)
        goals2 = int(goals2)
        t1.goals += goals1
        t2.goals += goals2
        if goals1 > goals2:
            t1.match_points += 3
            t1.alt_match_points += 5
            t2.match_points += 0
            t2.alt_match_points += 1
        elif goals1 < goals2:
            t2.match_points += 3
            t2.alt_match_points += 5
            t1.match_points += 0
            t1.alt_match_points += 1
        else:
            t2.match_points += 1
            t2.alt_match_points += 1
            t1.match_points += 3
            t1.alt_match_points += 3
        db.session.commit()
        return jsonify({'message': "Results uploaded successfully!"}), 200