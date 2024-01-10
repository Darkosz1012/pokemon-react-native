import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FavoritesScreen from '../screens/FavoritesScreen';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';

const Tab = createMaterialBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: { FavoriteIcon },
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: { ListIcon },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: { MapIcon },
        }}
      />
    </Tab.Navigator>
  );
}

function FavoriteIcon({ color }) {
  return (
    <MaterialCommunityIcons name="cards-heart-outline" color={color} size={26} />
  );
}

function ListIcon({ color }) {
  return (
    <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={26} />
  );
}

function MapIcon({ color }) {
  return (
    <MaterialCommunityIcons name="map-legend" color={color} size={26} />
  );
}
