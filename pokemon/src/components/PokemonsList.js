import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FlatList, Text, View,
} from 'react-native';

import PokemonListItem from './PokemonListItem';

const fetchPokemonsPage = ({ pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0' }) => fetch(pageParam).then((res) => res.json());

export default function PokemonsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemonsPage,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  if (status === 'loading') {
    return (<Text>Loading...</Text>);
  }
  if (status === 'error') {
    return (
      <Text>
        Error:
        {' '}
        Something went wrong.
      </Text>
    );
  }

  return (
    <View>
      <FlatList
        data={data?.pages.flatMap((page) => page.results)}
        renderItem={({ item, index }) => (
          <PokemonListItem key={index} pokemon={item} />
        )}
        keyExtractor={(item) => item.name}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
