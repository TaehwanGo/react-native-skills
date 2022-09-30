import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';

function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
