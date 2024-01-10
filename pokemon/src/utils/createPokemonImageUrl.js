import extractPokemonId from './extractPokemonId';

export default function createPokemonImageUrl(pokemonUrl) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonId(pokemonUrl)}.png`;
}
