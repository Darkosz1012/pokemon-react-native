export default function extractPokemonId(url) {
  let arr = url.split("/");
  return arr[arr.length - 2];
}