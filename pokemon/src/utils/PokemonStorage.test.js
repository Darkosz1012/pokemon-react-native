import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllFavorites, addToFavorites, removeFromFavorites } from './PokemonStorage'; // Update the path accordingly

jest.mock('@react-native-async-storage/async-storage', () => ({
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('PokemonStorage', () => {
  describe('getAllFavorites', () => {
    test('should filter out keys not belonging to favorite', async () => {
      AsyncStorage.getAllKeys.mockImplementationOnce(() => [
        'test',
        '@favorite-Bulbasaur',
      ]);
      AsyncStorage.multiGet.mockImplementationOnce(() => []);

      await getAllFavorites();

      expect(AsyncStorage.multiGet).toHaveBeenCalledWith(['@favorite-Bulbasaur']);
    });
    test('should return array with all favorites', async () => {
      AsyncStorage.getAllKeys.mockImplementationOnce(() => []);

      AsyncStorage.multiGet.mockImplementationOnce(() => [
        ['@favorite-Bulbasaur', '{ "test1": "test1" }'],
      ]);

      const result = await getAllFavorites();

      expect(result).toEqual([{ test1: 'test1' }]);
    });
  });
  describe('addToFavorites', () => {
    test('should add a pokemon to favorites', async () => {
      const pokemon = { name: 'Bulbasaur' };
      await addToFavorites(pokemon);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@favorite-Bulbasaur', '{"name":"Bulbasaur"}');
    });
  });

  describe('removeFromFavorites', () => {
    test('should remove a pokemon from favorites', async () => {
      const pokemon = 'Bulbasaur';
      await removeFromFavorites(pokemon);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@favorite-Bulbasaur');
    });
  });
});
