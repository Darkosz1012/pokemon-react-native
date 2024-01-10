import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
// import { getAllFavorites , addToFavorites as addToStorage } from '../utils/PokemonStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const filterKeys = (keys, prefix) => keys.filter((key) => key.startsWith(prefix));

  const getAllFavorites = useCallback(async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const filteredKeys = filterKeys(allKeys, '@favorite');
      const values = (await AsyncStorage.multiGet(filteredKeys)).map((val) => JSON.parse(val[1]));
      return values;
    } catch (err) {
      console.error(err);
    }
    return [];
  }, []);

  const refetchFavorites = useCallback(() => {
    getAllFavorites().then((res) => setFavorites(res));
  }, [getAllFavorites]);

  const addToFavorites = useCallback(async (pokemon) => {
    try {
      await AsyncStorage.setItem(`@favorite-${pokemon.name}`, JSON.stringify(pokemon));
    } catch (err) {
      console.error(err);
    }
    refetchFavorites();
  }, [refetchFavorites]);

  const removeFromFavorites = useCallback(async (pokemonName) => {
    try {
      await AsyncStorage.removeItem(`@favorite-${pokemonName}`);
    } catch (err) {
      console.error(err);
    }
    refetchFavorites();
  }, [refetchFavorites]);

  const isFavorite = useCallback(
    (pokemonName) => favorites.some((elm) => elm.name === pokemonName),
    [favorites],
  );

  const toggleFavorite = useCallback(async (pokemon) => {
    try {
      if (isFavorite(pokemon.name)) {
        await removeFromFavorites(pokemon.name);
      } else {
        await addToFavorites(pokemon);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFavorite, removeFromFavorites, addToFavorites]);

  const foo = useMemo(() => ({
    favorites, refetchFavorites, toggleFavorite, isFavorite,
  }), [favorites, refetchFavorites, toggleFavorite, isFavorite]);

  return (
    <FavoritesContext.Provider value={foo}>
      {children}
    </FavoritesContext.Provider>
  );
}
