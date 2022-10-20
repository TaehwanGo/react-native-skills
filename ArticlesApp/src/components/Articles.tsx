import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Article} from '../types/api';
import ArticleItem from './ArticlesItem';

export interface ArticlesProps {
  articles: Article[];
}

function Articles({articles}: ArticlesProps) {
  return (
    <FlatList
      data={articles}
      renderItem={({item}) => (
        <ArticleItem
          id={item.id}
          title={item.title}
          publishedAt={item.published_at}
          username={item.user.username}
        />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() => {
        // articles가 1개 이상 있을 때만 최하단 테두리 보여주기
        return articles.length > 0 ? <View style={styles.separator} /> : null;
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    with: '100%',
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});

export default Articles;
