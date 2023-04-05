#dockerid = barrister_ingredient
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Ingredient(db.Model):
    __tablename__ = 'ingredient'

    ingredient_id = db.Column(db.Integer, primary_key=True)
    ingredient_name = db.Column(db.String(255), nullable=False)
    ingredient_category = db.Column(db.String(255), nullable=False)
    ingredient_price = db.Column(db.Integer)


    def __init__(self, ingredient_id, ingredient_name, ingredient_category, ingredient_price):
        self.ingredient_id = ingredient_id
        self.ingredient_name = ingredient_name
        self.ingredient_category = ingredient_category
        self.ingredient_price = ingredient_price

    def json(self):
        return {"ingredient_id": self.ingredient_id, "ingredient_name": self.ingredient_name
                , "ingredient_category": self.ingredient_category, "ingredient_price": self.ingredient_price}

#Get ingredient list
@app.route("/barrister_ingredient")
def get_all():
    ingredientlist = Ingredient.query.all()
    if len(ingredientlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "ingredients": [ingredient.json() for ingredient in ingredientlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no ingredients."
        }
    ), 404

#Get ingredient list by category
@app.route("/barrister_ingredient/<string:ingredient_category>")
def find_by_ingredient_category(ingredient_category):
    categorylist = Ingredient.query.filter_by(ingredient_category=ingredient_category)
    if categorylist:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "categories": [category.json() for category in categorylist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Ingredient within the category is not found."
        }
    ), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)