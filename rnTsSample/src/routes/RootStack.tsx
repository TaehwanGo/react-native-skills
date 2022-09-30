import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screen/DetailsScreen';
import { RootStackParamList } from '../types/route';
import MainTab from '../screen/MainTab';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
