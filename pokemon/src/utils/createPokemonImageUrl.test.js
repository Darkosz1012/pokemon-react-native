import createPokemonImageUrl from './createPokemonImageUrl';

describe('createPokemonImageUrl', () => {
  test('should return correct image url', () => {
    expect(createPokemonImageUrl('https://pokeapi.co/api/v2/pokemon/1/')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
    expect(createPokemonImageUrl('https://pokeapi.co/api/v2/pokemon/100/')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png');
    expect(createPokemonImageUrl('https://pokeapi.co/api/v2/pokemon/112341/')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112341.png');
  });
});
