import React from 'react';
import {Text} from 'react-native';
import Profile from './components/Profile';

function App() {
  return (
    <Profile name="Tony" isActivated>
      <Text>Hello world</Text>
    </Profile>
  );
}

export default App;
