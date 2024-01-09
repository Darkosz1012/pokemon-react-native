import { Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function FavoriteButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.favoriteButtonText}>Dodaj do ulubionych</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButtonText: {
    color: 'blue',
    fontSize: 14,
  },
});