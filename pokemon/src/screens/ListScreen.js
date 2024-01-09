import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import createPokemonImageUrl from '../utils/createPokemonImageUrl';
import PokemonListItem from '../components/PokemonListItem';

const fetchList = ({ pageParam = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0` }) => {
  return fetch(pageParam).then(res => res.json());
};

export default function ListScreen() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({queryKey: ['items'], queryFn: fetchList, 
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
          <PokemonListItem key={index} name={item.name} imageUrl={createPokemonImageUrl(item.url)}/>
        )
      }}
      keyExtractor={item => item.name}
      onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
    />
  </View>
  );
}

