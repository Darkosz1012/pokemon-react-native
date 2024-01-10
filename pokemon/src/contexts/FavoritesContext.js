import React, { createContext, useState, useContext, useEffect } from 'react';
// import { getAllFavorites , addToFavorites as addToStorage } from '../utils/PokemonStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';



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

  const filterKeys = (keys, prefix) => keys.filter(key => key.startsWith(prefix));

  const getAllFavorites = async() => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const filteredKeys = filterKeys(allKeys, "@favorite");
      const values = (await AsyncStorage.multiGet(filteredKeys)).map((val)=>JSON.parse(val[1]));
      return values;
    } catch (err) {
      console.error(err)
    }
  }

  const refetchFavorites = () =>{
    getAllFavorites().then((res)=>setFavorites(res))
  }

  const addToFavorites = async (pokemon) =>{
    try {
      await AsyncStorage.setItem(`@favorite-${pokemon.name}`, JSON.stringify(pokemon))
    } catch (err) {
      console.error(err)
    }
    refetchFavorites();
  }

  const removeFromFavorites = async (pokemonName) => {
    try {
      await AsyncStorage.removeItem(`@favorite-${pokemonName}`)
    } catch (err) {
      console.error(err)
    }
    refetchFavorites();
  }

  const toggleFavorite = async (pokemon) =>{
    try {
      if(await isFavorite(pokemon.name)){
        await removeFromFavorites(pokemon.name);
      }else{
        await addToFavorites(pokemon)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const isFavorite = (pokemonName) => {
    // try {
    //   const value = await AsyncStorage.getItem(`@favorite-${pokemonName}`)
    //   if(value !== null) {
    //     return true;
    //   }
    // } catch (err) {
    //   console.error(err)
    // }
    // return false; 
    return favorites.some((elm) => elm.name === pokemonName)
  }

  useEffect(()=>{
    refetchFavorites()
  },[])


  return (
    <FavoritesContext.Provider value={{ favorites, refetchFavorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};