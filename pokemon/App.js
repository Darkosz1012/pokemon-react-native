// eslint-disable-next-line import/no-extraneous-dependencies
import { NavigationContainer } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import AppStack from './src/routes/AppStack';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}
