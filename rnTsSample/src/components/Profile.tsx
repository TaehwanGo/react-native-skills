import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface ProfileProps {
  name: string;
  isActivated?: boolean;
  image?: string;
  children?: React.ReactNode;
}
function Profile({
  name,
  isActivated,
  // image = 'https://picsum.photos/200',
  image = 'https://i.picsum.photos/id/179/200/200.jpg?hmac=I0g6Uht7h-y3NHqWA4e2Nzrnex7m-RceP1y732tc4Lw',
  children,
}: ProfileProps) {
  return (
    <View style={styles.container}>
      <View style={isActivated && styles.activeStyle}>
        <Image source={{uri: image}} />
        <Text style={styles.text}>{name}</Text>
        <View>{children}</View>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  text: {
    color: '#ffffff',
  },
  activeStyle: {
    backgroundColor: 'orange',
  },
});
