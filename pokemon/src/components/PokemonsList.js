import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import PokemonListItem from './PokemonListItem';

const fetchPokemonsPage = ({ pageParam = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0` }) => {
  return fetch(pageParam).then(res => res.json());
};

export default function PokemonsList() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({queryKey: ['pokemons'], queryFn: fetchPokemonsPage, 
    getNextPageParam: (lastPage, pages) => lastPage.next,
  });


  return status === 'loading' ? (
    <Text>Loading...</Text>
  ) : status === 'error' ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View >
    <FlatList
       data={data?.pages.flatMap(page => page.results)}
      renderItem={({item,index}) => {
        return (
          <PokemonListItem key={index} pokemon={item} />
        )
      }}
      keyExtractor={item => item.name}
      onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
    />
  </View>
  );
}

