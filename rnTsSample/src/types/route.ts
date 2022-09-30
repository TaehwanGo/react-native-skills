import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabNavigationScreenParams } from '../screen/MainTab';

export type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  Details: {
    id: number;
  };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
