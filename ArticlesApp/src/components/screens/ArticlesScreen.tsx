import React from 'react';
import {Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {getArticles} from '../../api/articles';

function ArticlesScreen() {
  const {data, isLoading} = useQuery('articles', getArticles);
  console.log({data, isLoading});
  return (
    <View>
      <Text>ArticlesScreen</Text>
    </View>
  );
}

export default ArticlesScreen;
