import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AuthStatus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AuthStatus</Text>
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
