import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButtons from './AuthButtons';
import AuthStatus from './AuthStatus';

function AuthApp() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthStatus />
      <AuthButtons />
    </SafeAreaView>
  );
}

export default AuthApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
});
