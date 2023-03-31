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
    

@app.route("/order")
def get_all():
    orderlist = Order.query.all()
    if len(orderlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "orders": [order.json() for order in orderlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no orders."
        }
    ), 404


@app.route("/order/<string:order_id>")
def find_by_order_id(order_id):
    order = Order.query.filter_by(order_id=order_id).first()
    if order:
        return jsonify(
            {
                "code": 200,
                "data": order.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "order_id": order_id
            },
            "message": "Order not found."
        }
    ), 404


@app.route("/order", methods=['POST'])
def create_order():
    user_id = request.json.get('user_id', None)
    order = Order(user_id=user_id, order_status=0)

    cart_item = request.json.get('cart_item')
    for item in cart_item:
        order.order_item.append(Order_Item(
            book_id=item['book_id'], quantity=item['quantity']))

    try:
        db.session.add(order)
        db.session.commit()
    except Exception as e:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred while creating the order. " + str(e)
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": order.json()
        }
    ), 201
