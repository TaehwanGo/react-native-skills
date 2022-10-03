import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';
import { Provider } from 'react-redux';
import store from './\bstates/redux/store';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
