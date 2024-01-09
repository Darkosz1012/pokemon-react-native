import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FavoriteButton({ onPress, isFavorite }) {
  return (
    <TouchableOpacity onPress={onPress}>
      {isFavorite ?
        <MaterialCommunityIcons name="cards-heart"  size={26} />
      :
      <MaterialCommunityIcons name="cards-heart-outline"  size={26} />  
    }
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButtonText: {
    color: 'blue',
    fontSize: 14,
  },
});