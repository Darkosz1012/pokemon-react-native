import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PokemonCard from './PokemonCard';
import { useFavorites } from '../contexts/FavoritesContext';


export default function FavoritesList(){
  const {favorites} = useFavorites();

  return (
    <FlatList
      data={favorites}
      renderItem={({item,index}) => {
        return (
          <PokemonCard  pokemon={item} />
        )
      }}
      keyExtractor={item => item.name}
      numColumns={2} 
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  item: {
    backgroundColor: '#f9c2ff',
    color: "#ffffff",
    flex: 1,
    margin: 10, 
    height: 150, 
  },
});