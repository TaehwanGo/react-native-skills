import React from 'react';
import { Button, View } from 'react-native';
import useAuthAction from '../../hooks/useAuthAction';

const AuthButtons = () => {
  const { authorize, logout } = useAuthAction();
  const onPressLogin = () => {
    authorize({ id: 1, username: 'TaehwanGo', displayName: 'Tony' });
  };
  const onPressLogout = () => {
    logout();
  };
  return (
    <View>
      <Button title="로그인" onPress={onPressLogin} />
      <Button title="로그아웃" onPress={onPressLogout} />
    </View>
  );
};

export default AuthButtons;
