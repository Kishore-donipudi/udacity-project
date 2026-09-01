import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from '../MovieDetails';

jest.mock('axios', () => {
  const mockAxios = { get: jest.fn() };
  return { __esModule: true, default: mockAxios };
});

const axios = require('axios').default;

beforeEach(() => {
  process.env.REACT_APP_MOVIE_API_URL = 'http://127.0.0.1:5000';
  axios.get.mockReset();
});

test('renders Top Gun movie details', async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      movie: {
        title: 'Top Gun: Maverick',
        description: 'Pete Maverick Mitchell returns to train an elite team.',
      },
    },
  });

  render(<MovieDetails movie={{ id: '123' }} />);

  expect(await screen.findByRole('heading', { name: 'Top Gun: Maverick' })).toBeInTheDocument();
  expect(screen.getByText('Pete Maverick Mitchell returns to train an elite team.')).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/movies/123');
});

test('renders Sonic movie details', async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      movie: {
        title: 'Sonic the Hedgehog',
        description: 'Sonic teams up with new friends to protect a powerful emerald.',
      },
    },
  });

  render(<MovieDetails movie={{ id: '456' }} />);

  expect(await screen.findByRole('heading', { name: 'Sonic the Hedgehog' })).toBeInTheDocument();
  expect(screen.getByText('Sonic teams up with new friends to protect a powerful emerald.')).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/movies/456');
});

test('renders A Quiet Place movie details', async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      movie: {
        title: 'A Quiet Place',
        description: 'The Abbott family searches for a way forward while remaining silent.',
      },
    },
  });

  render(<MovieDetails movie={{ id: '789' }} />);

  expect(await screen.findByRole('heading', { name: 'A Quiet Place' })).toBeInTheDocument();
  expect(screen.getByText('The Abbott family searches for a way forward while remaining silent.')).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/movies/789');
});