import { Text } from 'react-native';
import FavoriteList from '../components/FavoriteList';
import { useEffect, useState } from 'react';
import { getAllFavorite } from '../utils/PokemonStorage';

export default function FavoriteScreen() {
  const [favorite, setFavorite] = useState([]);

  useEffect(()=>{
    getAllFavorite().then((res)=>setFavorite(res))
  },[])

  return (
    <FavoriteList data={favorite} />
  );
}