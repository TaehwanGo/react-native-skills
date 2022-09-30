import React, {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../types/screen';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPress = () => {
    navigation.navigate('Details', {id: 1});
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <Button title="Go to Details" onPress={onPress} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
