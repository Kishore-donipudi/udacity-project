import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_MOVIE_API_URL || 'http://127.0.0.1:5000';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/movies`).then((response) => {
      setMovies(response.data.movies);
    });
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li className="movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
