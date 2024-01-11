import extractPokemonId from './extractPokemonId';

describe('extractPokemonId', () => {
  test('should get correct ID from pokemon url', () => {
    expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/1/')).toBe('1');
    expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/100/')).toBe('100');
    expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/12312/')).toBe('12312');
  });
});
