from flask import jsonify
from flask.views import MethodView

# Dummy database to hold movie examples
movies = {
    "123": {
        "title": "Top Gun: Maverick",
        "description": "Pete Maverick Mitchell returns to train an elite team for a dangerous mission that forces him to face the risks of his past.",
    },
    "456": {
        "title": "Sonic the Hedgehog",
        "description": "A fast-paced adventure follows Sonic as he races across the world to stop Dr. Robotnik from capturing the power of a mysterious emerald.",
    },
    "789": {
        "title": "A Quiet Place",
        "description": "A family must stay completely silent to survive a terrifying creature that hunts by sound in a desolate, post-apocalyptic world.",
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
