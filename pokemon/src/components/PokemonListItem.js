import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import useIsFavorite from '../hooks/useIsFavorite';
import createPokemonImageUrl from '../utils/createPokemonImageUrl';
import FavoriteButton from './FavoriteButton';

export default function PokemonListItem({ pokemon }){
  const {toggleFavorite, isFavorite} = useFavorites();

 
  const handleFavoritePress = async () => {
    await toggleFavorite(pokemon);
  };

  return (
    <View style={styles.itemContainer}>
      <Image 
        source={{
          uri: createPokemonImageUrl(pokemon.url),
        }}
        style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <FavoriteButton onPress={handleFavoritePress} isFavorite={isFavorite(pokemon.name)} />
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