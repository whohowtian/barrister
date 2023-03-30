#dockerid = barrister_user
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql+mysqlconnector://root@localhost:3306/barrister_user')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)

class Order(db.Model):
    __tablename__ = 'order'

    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    order_status = db.Column(db.Integer, nullable=False)

    def __init__(self, order_id, user_id, order_status):
        self.order_id = order_id
        self.user_id = user_id
        self.order_status = order_status

    def json(self):
        return {"order_id": self.order_id, "user_id": self.user_id, "order_status": self.order_status}
    
