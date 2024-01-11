import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAllFavorites, addToFavorites, removeFromFavorites } from '../utils/PokemonStorage';

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

  const refetchFavorites = useCallback(() => {
    getAllFavorites().then((res) => setFavorites(res));
  }, []);

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
    refetchFavorites();
  }, [isFavorite, refetchFavorites]);

  useEffect(() => {
    refetchFavorites();
  }, [refetchFavorites]);

  const foo = useMemo(() => ({
    favorites, refetchFavorites, toggleFavorite, isFavorite,
  }), [favorites, refetchFavorites, toggleFavorite, isFavorite]);

  return (
    <FavoritesContext.Provider value={foo}>
      {children}
    </FavoritesContext.Provider>
  );
}
