import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PokemonCard from './PokemonCard';


export default function FavoriteList({data}){
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={({item,index}) => {
        return (
          <PokemonCard key={index} pokemon={item} />
        )
      }}
      keyExtractor={item => item.id}
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