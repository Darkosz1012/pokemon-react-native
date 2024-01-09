import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import createPokemonImageUrl from '../utils/createPokemonImageUrl';
import PokemonListItem from '../components/PokemonListItem';

export default function ListScreen() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0').then(
        (res) => res.json(),
      ),
  });
  return (
    <>
      {isLoading ? <Text>"Loading"</Text> : <FlatListBasics data={data.results} />}

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const FlatListBasics = (props) => {
  return (
    <View >
      <FlatList
        data={props.data}
        renderItem={({ item }) => {
          return (
            <PokemonListItem name={item.name} imageUrl={createPokemonImageUrl(item.url)}/>
          )
        }}
      />
    </View>
  );
};