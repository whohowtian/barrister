from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/driver'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)


class Driver(db.Model):
    __tablename__ = 'driver'


    driver_id = db.Column(db.Integer, primary_key=True)
    driver_name = db.Column(db.String(64), nullable=False)
    phone_num = db.Column(db.String(20), nullable=False)


    def __init__(self, driver_id, driver_name, phone_num):
        self.driver_id = driver_id
        self.driver_name = driver_name
        self.phone_num = phone_num


    def json(self):
        return {"driver_id": self.driver_id, "driver_name": self.driver_name, "phone_num": self.phone_num}


@app.route("/driver")
def get_all():
    driverList = Driver.query.all()
    if len(driverList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "books": [driver.json() for driver in driverList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no drivers."
        }
    ), 404

@app.route("/driver/<int:driver_id>")
def get_driver(driver_id):
    driver = Driver.query.filter_by(driver_id=driver_id).first()
    if driver:
        return jsonify(
            {
                "code": 200,
                "data": driver.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Driver not found."
        }
    ), 404

@app.route("/driver/<int:driver_id>", methods=['POST'])
def create_driver(driver_id):
    if (Driver.query.filter_by(driver_id=driver_id).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "driver_id": driver_id
                },
                "message": "Driver already exists."
            }
        ), 400


    data = request.get_json()
    driver = Driver(driver_id, **data)


    try:
        db.session.add(driver)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "driver_id": driver_id
                },
                "message": "An error occurred creating the driver."
            }
        ), 500


    return jsonify(
        {
            "code": 201,
            "data": driver.json()
        }
    ), 201


if __name__ == '__main__':
    app.run(port=5000, debug=True)