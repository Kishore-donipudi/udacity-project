from flask import jsonify
from flask.views import MethodView

# Dummy database to hold movie examples
movies = {
    "123": {
        "title": "Top Gun: Maverick",
        "description": (
            "Pete Maverick Mitchell returns to train an elite team for a dangerous mission "
            "that forces him to face the risks of his past."
        ),
    },
    "456": {
        "title": "Sonic the Hedgehog",
        "description": (
            "Sonic teams up with new friends to protect a powerful emerald while Dr. Robotnik "
            "returns with a formidable rival."
        ),
    },
    "789": {
        "title": "A Quiet Place",
        "description": (
            "The Abbott family searches for a way forward while remaining silent against "
            "creatures that hunt every sound they make."
        ),
    },
}


class Movies(MethodView):
    def get(self, movie_id):
        if movie_id is None:
            # Return a list of all movies
            return jsonify({"movies": [dict({"title": movie["title"]}, **{"id": i}) for i, movie in movies.items()]})
        else:
            # Return the details of a specific movie
            return jsonify({"movie": movies[str(movie_id)]})
