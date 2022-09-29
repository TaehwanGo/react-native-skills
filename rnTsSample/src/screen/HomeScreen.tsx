import React, {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../types/screen';

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPress = () => {
    navigation.navigate('Details', {id: 1});
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={onPress} />
    </View>
  );
};

export default HomeScreen;
