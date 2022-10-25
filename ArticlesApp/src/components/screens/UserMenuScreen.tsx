import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {RootStackNavigationProp} from '../../types/screens';
import MenuItem from '../MenuItem';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPressLogin = () => navigation.navigate('Login');
  const onPressRegister = () => navigation.navigate('Register');
  return (
    <View>
      <MenuItem name="로그인" onPress={onPressLogin} />
      <MenuItem name="회원가입" onPress={onPressRegister} />
    </View>
  );
}

export default UserMenuScreen;
