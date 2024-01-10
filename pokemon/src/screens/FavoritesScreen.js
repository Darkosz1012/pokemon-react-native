import FavoritesList from '../components/FavoritesList';
import { useEffect, useState } from 'react';
import { getAllFavorites } from '../utils/PokemonStorage';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoritesScreen() {

  return (
    <FavoritesList/>
  );
}