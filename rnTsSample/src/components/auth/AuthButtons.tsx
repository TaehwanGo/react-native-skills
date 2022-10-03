import React from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authorize, logout } from '../../states/redux/slice/auth';

const AuthButtons = () => {
  const dispatch = useDispatch();
  const onPressLogin = () => {
    dispatch(authorize({ id: 1, username: 'TaehwanGo', displayName: 'Tony' }));
  };
  const onPressLogout = () => {
    dispatch(logout());
  };
  return (
    <View>
      <Button title="로그인" onPress={onPressLogin} />
      <Button title="로그아웃" onPress={onPressLogout} />
    </View>
  );
};

export default AuthButtons;
