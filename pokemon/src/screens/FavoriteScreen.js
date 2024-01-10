import FavoriteList from '../components/FavoriteList';
import { useEffect, useState } from 'react';
import { getAllFavorite } from '../utils/PokemonStorage';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoriteScreen() {
  // const [favorite, setFavorite] = useState([]);


  // useEffect(()=>{
  //   getAllFavorite().then((res)=>setFavorite(res))
  // },[])

  const {favorites, refetchFavorites} = useFavorites();

  return (
    <FavoriteList data={favorites} onChange={refetchFavorites} />
  );
}