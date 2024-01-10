import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @deprecated Use `FavoriteContext` instead.
 */
export async function addToFavorites(pokemon) {
  try {
    await AsyncStorage.setItem(`@favorite-${pokemon.name}`, JSON.stringify(pokemon));
  } catch (err) {
    console.error(err);
  }
}

/**
 * @deprecated Use `FavoriteContext` instead.
 */
export async function removeFromFavorites(pokemonName) {
  try {
    await AsyncStorage.removeItem(`@favorite-${pokemonName}`);
  } catch (err) {
    console.error(err);
  }
}

/**
 * @deprecated Use `FavoriteContext` instead.
 */
export async function isFavorite(pokemonName) {
  try {
    const value = await AsyncStorage.getItem(`@favorite-${pokemonName}`);
    if (value !== null) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
}

const filterKeys = (keys, prefix) => keys.filter((key) => key.startsWith(prefix));

/**
 * @deprecated Use `FavoriteContext` instead.
 */
export async function getAllFavorites() {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const filteredKeys = filterKeys(allKeys, '@favorite');
    const values = (await AsyncStorage.multiGet(filteredKeys)).map((val) => JSON.parse(val[1]));
    return values;
  } catch (err) {
    console.error(err);
  }
  return [];
}
