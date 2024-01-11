/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  waitFor,
  renderHook,
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

const wrapper = ({ children }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesContext', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should render initial values', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });
  });

  test('Should set correct favorites after refetchFavorites', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    getAllFavorites.mockImplementation(() => Promise.resolve([{ test: 'test' }]));

    result.current.refetchFavorites();

    await waitFor(() => {
      expect(result.current.favorites).toEqual([{ test: 'test' }]);
    });
  });

  test('should remove from favorites when toggleFavorite was called and pokemon was in favorites', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    getAllFavorites.mockImplementation(() => Promise.resolve([{ name: 'test' }]));

    result.current.refetchFavorites();
    await waitFor(() => {
      expect(result.current.favorites).toEqual([{ name: 'test' }]);
    });

    result.current.toggleFavorite({ name: 'test' });

    await waitFor(() => {
      expect(removeFromFavorites).toHaveBeenCalledTimes(1);
    });
  });

  test('should add to favorites when toggleFavorite was called and pokemon wasn\'t in favorites', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    getAllFavorites.mockImplementation(() => Promise.resolve([{ name: 'test1' }]));

    result.current.refetchFavorites();
    await waitFor(() => {
      expect(result.current.favorites).toEqual([{ name: 'test1' }]);
    });

    result.current.toggleFavorite({ name: 'test' });

    await waitFor(() => {
      expect(addToFavorites).toHaveBeenCalledTimes(1);
    });
  });
});
