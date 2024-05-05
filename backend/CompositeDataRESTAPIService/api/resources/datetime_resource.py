from flask_restful import Resource


class DatetimeResource(Resource):
    def get(self):
        return {"date": "time"}
