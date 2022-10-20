import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/routes/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
