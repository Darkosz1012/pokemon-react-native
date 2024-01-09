
import { Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Favorite" component={FavoriteScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cards-heart-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen name="List" component={ListScreen}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen name="Map" component={MapScreen}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="map-legend" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


function ListScreen() {
    return (
        <Text>List</Text>
    );
}

function MapScreen() {
    return (
        <Text>Map</Text>
    );
}