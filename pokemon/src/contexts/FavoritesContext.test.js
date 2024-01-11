import React from 'react';
import {
  render, screen, fireEvent, act, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { FavoritesProvider, useFavorites } from './FavoritesContext';
import { addToFavorites, getAllFavorites, removeFromFavorites } from '../utils/PokemonStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('../utils/PokemonStorage', () => ({
  getAllFavorites: jest.fn().mockImplementation(() => Promise.resolve([])),
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
}));

function CustomTest({ pokemon }) {
  const {
    favorites, refetchFavorites, toggleFavorite, isFavorite,
  } = useFavorites();

  const toggle = () => {
    toggleFavorite(pokemon);
  };

  return (
    <>
      <div data-testid="favorites">{JSON.stringify(favorites)}</div>
      <div data-testid="refetchFavorites" onClick={refetchFavorites} />
      <div data-testid="toggleFavorite" onClick={toggle(pokemon)} />
      <div data-testid="isFavorite" onClick={isFavorite} />
    </>
  );
}
describe('FavoritesContext', () => {
  test('Should render initial values', async () => {
    render(
      <FavoritesProvider>
        <CustomTest />
      </FavoritesProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('favorites')).toHaveTextContent('[]');
    });
  });

  test('Should set correct favorites after refetchFavorites', async () => {
    getAllFavorites.mockImplementation(() => Promise.resolve([{ test: 'test' }]));
    render(
      <FavoritesProvider>
        <CustomTest />
      </FavoritesProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('refetchFavorites'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('favorites')).toHaveTextContent('[{"test":"test"}]');
    });
    getAllFavorites.mockClear();
  });

  test('should remove from favorites when toggleFavorite was called and pokemon was in favorites', async () => {
    getAllFavorites.mockImplementation(() => Promise.resolve([{ name: 'test' }]));
    render(
      <FavoritesProvider>
        <CustomTest pokemon={{ name: 'test' }} />
      </FavoritesProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('refetchFavorites'));
    });
    act(() => {
      fireEvent.click(screen.getByTestId('toggleFavorite'));
    });
    await waitFor(() => {
      expect(removeFromFavorites).toHaveBeenCalledTimes(1);
    });
  });

  test('should add to favorites when toggleFavorite was called and pokemon wasn\'t in favorites', async () => {
    getAllFavorites.mockImplementation(() => Promise.resolve([{ name: 'test' }]));
    render(
      <FavoritesProvider>
        <CustomTest pokemon={{ name: 'test' }} />
      </FavoritesProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('refetchFavorites'));
    });
    act(() => {
      fireEvent.click(screen.getByTestId('toggleFavorite'));
    });
    await waitFor(() => {
      expect(removeFromFavorites).toHaveBeenCalledTimes(1);
    });
  });
});
