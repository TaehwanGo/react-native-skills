import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/* MainTab */
export type MainTabParamList = {
  MainTab: undefined;
  Articles: undefined;
  UserMenu: undefined;
};
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<MainTabParamList, 'MainTab'>;

/* RootStack */
export type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  Article: {
    id: number;
  };
  Register: undefined;
  Login: undefined;
  MyArticles: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
