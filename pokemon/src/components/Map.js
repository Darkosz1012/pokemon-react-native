import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { MapMarker } from 'react-native-maps';
import { useQueryClient } from '@tanstack/react-query';
import PokemonModal from './PokemonModal';
import createRandomInt from '../utils/createRandomInt';

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [randomId, setRandomId] = useState(createRandomInt(1000));
  const queryClient = useQueryClient();

  const hide = () => {
    setRandomId(createRandomInt(1000));
    setModalVisible(false);
    queryClient.invalidateQueries({ queryKey: ['pokemon'] });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(event) => {
          const coord = event.nativeEvent.coordinate;
          if (coord) {
            setMarkers((arr) => [...arr, coord]);
          }
          setModalVisible(true);
        }}
      >
        {markers?.map((marker) => (
          <MapMarker
            key={`${marker.latitude}${marker.longitude}`}
            coordinate={marker}
          />
        ))}
      </MapView>
      <PokemonModal pokemonId={randomId} visible={modalVisible} onHide={hide} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
