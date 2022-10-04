import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useUser from '../../hooks/useUser';

const AuthStatus = () => {
  const user = useUser();
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
