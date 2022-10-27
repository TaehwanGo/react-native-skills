import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from '../components/tab/MainTab';
import ArticleScreen from '../components/screens/ArticleScreen';
import {RootStackParamList} from '../types/screens';
import MyArticlesScreen from '../components/screens/MyArticlesScreen';
import LoginScreen from '../components/screens/LoginScreen';
import RegisterScreen from '../components/screens/RegisterScreen';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import WriteScreen from '../components/screens/WriteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  useAuthLoadEffect();
  return (
    <Stack.Navigator screenOptions={{headerBackTitle: '닫기'}}>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          title: '게시글',
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: '회원가입',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '로그인',
        }}
      />
      <Stack.Screen
        name="MyArticles"
        component={MyArticlesScreen}
        options={{
          title: '내 게시글',
        }}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{title: '새 게시글 작성'}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
