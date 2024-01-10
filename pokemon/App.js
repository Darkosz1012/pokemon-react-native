
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/routes/AppStack';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { FavoritesProvider } from './src/contexts/FavoritesContext';



const queryClient = new QueryClient()

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
