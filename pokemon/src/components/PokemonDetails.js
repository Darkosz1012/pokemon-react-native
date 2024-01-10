import React from 'react';
import {
  Image, StyleSheet,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '../contexts/FavoritesContext';
import FavoriteButton from './FavoriteButton';

export default function PokemonDetails({ id }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const {
    isLoading, isError, data, error,
  } = useQuery({ queryKey: ['pokemon'], queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => res.json()) });

  if (isLoading) {
    return (<Text>Loading...</Text>);
  }

  if (isError) {
    console.error(error);
    return (<Text>Error</Text>);
  }
  // console.log('data', `https://pokeapi.co/api/v2/pokemon/${id}/`, data);
  const handleFavoritePress = async () => {
    await toggleFavorite({ name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${id}/` });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data.sprites.front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.name}>
        Base experience:
        {' '}
        {data.base_experience}
      </Text>
      <Text style={styles.name}>
        Height:
        {' '}
        {data.height}
      </Text>
      <FavoriteButton onPress={handleFavoritePress} isFavorite={isFavorite(data.name)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    // flex: 1,
    margin: 10,
    // backgroundColor: '#eeeeee',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  name: {
    // flex: 1,
    marginBottom: 12,
    fontSize: 16,
  },
});
