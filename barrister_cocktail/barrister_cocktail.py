#dockerid = barrister_cocktail
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import func

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql+mysqlconnector://root@localhost:3306/barrister_cocktail')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Cocktail(db.Model):
    __tablename__ = 'cocktail'

    cocktail_id = db.Column(db.Integer, primary_key=True)
    cocktail_name = db.Column(db.String(255), primary_key=True)
    first_spirit = db.Column(db.Integer, nullable=False)
    second_spirit = db.Column(db.Integer, nullable=False)
    sweet_base = db.Column(db.Integer, nullable=False)
    sour_base = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    cocktail_price = db.Column(db.Float(precision=2), nullable=False)


    def __init__(self, cocktail_id, cocktail_name, first_spirit, second_spirit, sweet_base, sour_base, user_id, cocktail_price):
        self.cocktail_id = cocktail_id
        self.cocktail_name = cocktail_name
        self.first_spirit = first_spirit
        self.second_spirit = second_spirit
        self.sweet_base = sweet_base
        self.sour_base = sour_base
        self.user_id = user_id
        self.cocktail_price = cocktail_price

    def json(self):
        return {"cocktail_id": self.cocktail_id, "cocktail_name": self.cocktail_name, "first_spirit": self.first_spirit, "second_spirit": self.second_spirit, 
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
def find_cocktail_by_id(cocktail_id):
    cocktail = Cocktail.query.filter_by(cocktail_id=cocktail_id).first()
    if cocktail:
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
def find_addons_by_cocktail_id(cocktail_id):
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
            "message": "No addons found."
        }
    ), 404

#Create new cocktail recipe
@app.route("/barrister_cocktail/create_cocktail", methods=['POST'])
def create_cocktail():
    cocktail = request.get_json()
    # cocktailName = cocktail['name']

    # if (Cocktail.query.filter_by(cocktail_name=cocktailName).first()):
    #     return jsonify(
    #         {
    #             "message": "Cocktail already exists."
    #         }
    #     ), 400

    max_cocktail_id = db.session.query(func.max(Cocktail.cocktail_id)).first()

    if max_cocktail_id[0] == None:
        cocktailID = 1
    else:
        cocktailID = max_cocktail_id[0] + 1

    newCocktail = Cocktail(cocktailID, cocktail['name'], cocktail['spirit1'], cocktail['spirit2'], 
                        cocktail['sweet'], cocktail['sour'], cocktail['user'], cocktail['total'])

    try:
        db.session.add(newCocktail)

        for addOn in cocktail['add_ons']:
            db.session.add(Add_ons(addOn, cocktailID))

        db.session.commit()

    except:
        return jsonify(
            {
                "message": "An error occurred creating the cocktail."
            }
        ), 500
 
    return jsonify(
        {
            "data": newCocktail.json()
        }
    ), 201


if __name__ == '__main__':
    app.run(port=3003, debug=True)