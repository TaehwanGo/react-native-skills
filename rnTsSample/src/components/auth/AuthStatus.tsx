import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../states/redux/slice';

const AuthStatus = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {user ? user.displayName : '로그인이 필요합니다'}
      </Text>
    </View>
  );
};

export default AuthStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});
