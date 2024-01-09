import { View, Text, Image, StyleSheet } from 'react-native';
import FavoriteButton from './FavoriteButton';


export default function PokemonListItem({ name, imageUrl }){
  const handleFavoritePress = () => {
    console.log("fav")
  };

  return (
    <View style={styles.itemContainer}>
      <Image 
        source={{
          uri: imageUrl,
        }}
        style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <FavoriteButton onPress={handleFavoritePress} />
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