import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/routes/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserContextProvider} from './src/states/context/UserContext';

function App() {
  const queryClient = new QueryClient();
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
