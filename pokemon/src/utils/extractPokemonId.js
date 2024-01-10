export default function extractPokemonId(url) {
  const arr = url.split('/');
  return arr[arr.length - 2];
}
