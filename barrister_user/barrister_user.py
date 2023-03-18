#dockerid = barrister_user
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql+mysqlconnector://root@localhost:3306/barrister_user')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app) 

class User(db.Model):
    __tablename__ = 'user'

    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.Integer)
    email = db.Column(db.String(255))
    address = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False)

    def __init__(self, user_id, first_name, last_name, phone_number, email, address, role):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.email = email
        self.address = address
        self.role = role

    def json(self):
        return {"user_id": self.user_id, "first_name": self.first_name, "last_name": self.last_name, 
                "phone_number": self.phone_number, "email": self.email, "address": self.address, "role": self.role}

#Get all users
@app.route("/barrister_user")
def get_all():
    userlist = User.query.all()
    if len(userlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "users": [user.json() for user in userlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no users."
        }
    ), 404

#Get user by role
@app.route("/barrister_user/<string:role>")
def find_by_role(role):
    user = User.query.filter_by(role=role).first()
    if user:
        return jsonify(
            {
                "code": 200,
                "data": user.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "User not found."
        }
    ), 404

if __name__ == '__main__':
    app.run(port=3002, debug=True)