import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../MovieList';

jest.mock('axios', () => {
  const mockAxios = { get: jest.fn() };
  return { __esModule: true, default: mockAxios };
});

const axios = require('axios').default;

const mockMovies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
];

beforeEach(() => {
  process.env.REACT_APP_MOVIE_API_URL = 'http://127.0.0.1:5000';
  axios.get.mockReset();
});

test('renders movie titles', async () => {
  axios.get.mockResolvedValueOnce({ data: { movies: mockMovies } });

  const onMovieClick = jest.fn();
  render(<MovieList onMovieClick={onMovieClick} />);

  const movie1 = await screen.findByText(/Movie 1/);
  const movie2 = await screen.findByText(/Movie 2/);

  expect(movie1).toBeInTheDocument();
  expect(movie2).toBeInTheDocument();
});

test('uses the local backend URL when the env var is missing', async () => {
  delete process.env.REACT_APP_MOVIE_API_URL;
  axios.get.mockResolvedValueOnce({ data: { movies: mockMovies } });

  render(<MovieList onMovieClick={jest.fn()} />);

  await screen.findByText(/Movie 1/);

  expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/movies');
});

test('calls onMovieClick when movie is clicked', async () => {
  axios.get.mockResolvedValueOnce({ data: { movies: mockMovies } });

  const onMovieClick = jest.fn();
  render(<MovieList onMovieClick={onMovieClick} />);

  const movie1 = await screen.findByText(/Movie 1/);

  fireEvent.click(movie1);

  expect(onMovieClick).toHaveBeenCalledWith(mockMovies[0]);
});
