import { RouteProp, useRoute } from '@react-navigation/native';
import React, { SafeAreaView, Text } from 'react-native';
import { RootStackParamList } from '../types/route';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen = () => {
  const { params } = useRoute<DetailsScreenRouteProp>();
  return (
    <SafeAreaView>
      <Text>Details Screen {params.id}</Text>
    </SafeAreaView>
  );
};

export default DetailsScreen;
