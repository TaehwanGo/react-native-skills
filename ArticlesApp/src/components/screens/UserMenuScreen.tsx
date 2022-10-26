import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {clearToken} from '../../api/client';
import {useUserState} from '../../states/context/UserContext';
import {RootStackNavigationProp} from '../../types/screens';
import MenuItem from '../MenuItem';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [user, setUser] = useUserState();
  const onPressLogin = () => navigation.navigate('Login');
  const onPressRegister = () => navigation.navigate('Register');

  const onLogout = () => {
    setUser(null);
    clearToken();
  };

  return (
    <View>
      {user ? (
        <MenuItem name="로그아웃" onPress={onLogout} />
      ) : (
        <>
          <MenuItem name="로그인" onPress={onPressLogin} />
          <MenuItem name="회원가입" onPress={onPressRegister} />
        </>
      )}
    </View>
  );
}

export default UserMenuScreen;
