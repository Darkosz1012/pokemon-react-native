import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllFavorite } from '../utils/PokemonStorage';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const refetchFavorites = () =>{
    getAllFavorite().then((res)=>setFavorites(res))
  }

  useEffect(()=>{
    refetchFavorites()
  },[])


  return (
    <FavoritesContext.Provider value={{ favorites, refetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};