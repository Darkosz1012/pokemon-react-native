import { View, Text, Image, StyleSheet } from 'react-native';
import FavoriteButton from './FavoriteButton';
import { addToFavorite, isFavorite, removeFromFavorite } from '../utils/PokemonStorage';
import { useEffect, useState } from 'react';
import createPokemonImageUrl from '../utils/createPokemonImageUrl';
import useIsFavorite from '../hooks/useIsFavorite';

export default function PokemonCard({ pokemon }) {

  const [isFavoriteValue, setIsFavoriteValue] = useIsFavorite(pokemon);


  const handleFavoritePress = async () => {
    if (isFavoriteValue) {
      await removeFromFavorite(pokemon.name);
      setIsFavoriteValue(false);
    } else {
      await addToFavorite(pokemon);
      setIsFavoriteValue(true);
    }
  };

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
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    flex:1,
    margin: 10,
    backgroundColor: "#eeeeee",
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