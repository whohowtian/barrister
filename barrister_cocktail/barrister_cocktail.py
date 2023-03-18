#dockerid = barrister_cocktail
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql+mysqlconnector://root@localhost:3306/barrister_cocktail')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Cocktail(db.Model):
    __tablename__ = 'cocktail'

    cocktail_id = db.Column(db.Integer, primary_key=True)
    first_spirit = db.Column(db.Integer, nullable=False)
    second_spirit = db.Column(db.Integer, nullable=False)
    sweet_base = db.Column(db.Integer, nullable=False)
    sour_base = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    cocktail_price = db.Column(db.Float(precision=2), nullable=False)


    def __init__(self, cocktail_id, first_spirit, second_spirit, sweet_base, sour_base, user_id, cocktail_price):
        self.cocktail_id = cocktail_id
        self.first_spirit = first_spirit
        self.second_spirit = second_spirit
        self.sweet_base = sweet_base
        self.sour_base = sour_base
        self.user_id = user_id
        self.cocktail_price = cocktail_price

    def json(self):
        return {"cocktail_id": self.cocktail_id, "first_spirit": self.first_spirit, "second_spirit": self.second_spirit, 
                "sweet_base": self.sweet_base, "sour_base": self.sour_base, "user_id": self.user_id, "cocktail_price": self.cocktail_price}

class Add_ons(db.Model):
    __tablename__ = 'add_ons'

    addOn_id = db.Column(db.Integer, primary_key=True)
    cocktail_id = db.Column(db.Integer, primary_key=True)


    def __init__(self, addOn_id, cocktail_id):
        self.addOn_id = addOn_id
        self.cocktail_id = cocktail_id

    def json(self):
        return {"addOn_id": self.addOn_id, "cocktail_id": self.cocktail_id}

#Get all data from all tables
@app.route("/barrister_cocktail")
def get_all_list():
    cocktaillist = Cocktail.query.all()
    addonslist = Add_ons.query.all()
    if len(cocktaillist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "cocktails": [cocktail.json() for cocktail in cocktaillist],
                    "addons" : [addons.json() for addons in addonslist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no cocktail recipe."
        }
    ), 404

#Get all cocktail recipes
@app.route("/barrister_cocktail/cocktail")
def get_all_cocktail():
    cocktaillist = Cocktail.query.all()
    if len(cocktaillist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "cocktails": [cocktail.json() for cocktail in cocktaillist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no cocktail recipe."
        }
    ), 404

#Find cocktail using cocktail_id
@app.route("/barrister_cocktail/cocktail/<string:cocktail_id>")
def find_by_cocktail_id(cocktail_id):
    cocktail = Cocktail.query.filter_by(cocktail_id=cocktail_id).first()
    if book:
        return jsonify(
            {
                "code": 200,
                "data": cocktail.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Cocktail not found."
        }
    ), 404

#Get addons list in one cocktail recipe using cocktail_id
@app.route("/barrister_cocktail/addons/<string:cocktail_id>")
def find_by_cocktail_id(cocktail_id):
    addonlist = Add_ons.query.filter_by(cocktail_id=cocktail_id)
    if addonlist:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "addons": [addons.json() for addons in addonlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Book not found."
        }
    ), 404

#Create new cocktail recipe (NOT TESTED YET)
@app.route("/barrister_cocktail/create_cocktail", methods=['POST'])
def create_cocktail():
    data = request.get_json()
    cocktail = Cocktail(data)

    try:
        db.session.add(cocktail)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred creating the book."
            }
        ), 500


    return jsonify(
        {
            "code": 201,
            "data": cocktail.json()
        }
    ), 201

if __name__ == '__main__':
    app.run(port=3003, debug=True)