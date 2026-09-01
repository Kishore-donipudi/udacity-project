import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_MOVIE_API_URL || 'http://127.0.0.1:5000';

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/movies/${movie.id}`).then((response) => {
      setDetails(response.data);
    });
  }, [movie]);

  if (!details) {
    return <p>Loading movie details...</p>;
  }

  return (
    <article className="movieDetails">
      <h2>{details?.movie.title}</h2>
      <p>{details?.movie.description}</p>
    </article>
  );
}

export default MovieDetail;
