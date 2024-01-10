import { View, Text, Image, StyleSheet } from 'react-native';
import FavoriteButton from './FavoriteButton';
import { addToFavorites, isFavorite, removeFromFavorites } from '../utils/PokemonStorage';
import { useEffect, useState } from 'react';
import createPokemonImageUrl from '../utils/createPokemonImageUrl';
import useIsFavorite from '../hooks/useIsFavorite';
import { useFavorites } from '../contexts/FavoritesContext';

export default function PokemonListItem({ pokemon }){
  const [isFavoriteValue, setIsFavoriteValue, refetchIsFavorite ] = useIsFavorite(pokemon);
  const {refetchFavorites} = useFavorites();
 
  const handleFavoritePress = async () => {
    if(isFavoriteValue){
      await removeFromFavorites(pokemon.name);
      setIsFavoriteValue(false);
    }else{
      await addToFavorites(pokemon);
      setIsFavoriteValue(true);
    }
    refetchFavorites();
  };

  useEffect(()=>{
    refetchIsFavorite();
  })

  return (
    <View style={styles.itemContainer}>
      <Image 
        source={{
          uri: createPokemonImageUrl(pokemon.url),
        }}
        style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <FavoriteButton onPress={handleFavoritePress} isFavorite={isFavoriteValue} />
    </View>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
});