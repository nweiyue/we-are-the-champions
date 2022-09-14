from flask import Blueprint, request, jsonify
from .models import Team
from datetime import datetime
from . import db

routes = Blueprint('routes', __name__)

@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    err_msg = ""
    teams = data.get('teamName').split('\n')
    
    for team in teams:
        details = [d.strip() for d in team.split(' ')]
        if len(details) != 3:
            err_msg = "Input of each team must be in the format of <Team Name> <Registration date in DD/MM> <Group Number>"
            break

        team_name, registration_date, group_number = details
        date = datetime.now()

        team = Team.query.filter_by(team_name=team_name).first()
        if team:
            err_msg = f"There already exist a team called {team_name}."
            break
        if not group_number.isdigit():
            err_msg = "Group number must be a number."
            break
        
        date_str = registration_date.split('/')
        if len(date_str) != 2 or len(date_str[0]) != 2 or len(date_str[1]) != 2:
            err_msg = "Invalid date format."
            break
        try:
            date = datetime.strptime(registration_date, "%d/%m")
        except ValueError:
            err_msg = "Invalid date format."
            return jsonify({'message': err_msg}), 500
                
        group_number = int(group_number)
        team = Team(team_name=team_name, registration_date=date, group_number=group_number)
        db.session.add(team)

    if err_msg != "":
        return jsonify({'message': err_msg}), 500
    else:
        db.session.commit()
        return jsonify({'message': "Team added successfully!"}), 200

@routes.route('/results', methods=['POST'])
def upload_results():
    data = request.get_json()
    results = data.get('team1').split('\n')

    err_msg = ""
    for result in results:
        details = [d.strip() for d in result.split(' ')]
        if len(details) != 4:
            err_msg = "Input of each result must be in the format of <Team 1 name> <Team 2 name> <Team 1 goals scored> <Team 2 goals scored>"
            break

        team1, team2, goals1, goals2 = details

        t1 = Team.query.filter_by(team_name=team1).first()
        t2 = Team.query.filter_by(team_name=team2).first()
        if team1 == team2:
            err_msg = f"The 2 teamnames must be different."
            break
        if not t1 or not t2:
            err_msg = f"Both of teams must be registered."
            break
        if not goals1.isdigit() or not goals2.isdigit():
            err_msg = "Goals scored must be a number."
            break
        if t1.group_number != t2.group_number:
            err_msg = "Both teams must be in the same group."
            break

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

    if err_msg != "":
        return jsonify({'message': err_msg}), 500
    else:
        db.session.commit()
        return jsonify({'message': "Results uploaded successfully!"}), 200

@routes.route('/rank', methods=['GET'])
def get_rank():
    team1_res = db.session.query(Team.team_name, Team.group_number).filter_by(group_number=1).order_by(Team.match_points.desc(), Team.goals.desc(), Team.alt_match_points.desc(), Team.registration_date.asc()).all()
    team2_res = db.session.query(Team.team_name, Team.group_number).filter_by(group_number=2).order_by(Team.match_points.desc(), Team.goals.desc(), Team.alt_match_points.desc(), Team.registration_date.asc()).all()

    team1_res = [str(getattr(row, "team_name")) for row in team1_res]
    team2_res = [str(getattr(row, "team_name")) for row in team2_res]
    
    return jsonify({'message': "Results uploaded successfully!", 'data': {1: team1_res, 2: team2_res}}), 200

@routes.route('/clear', methods=['DELETE'])
def clear_data():
    try:
        db.session.query(Team).delete()
        db.session.commit()
    except:
        db.session.rollback()
    
    return jsonify({'message': "All data cleared!"}), 200