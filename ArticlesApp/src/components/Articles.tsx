import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {Article} from '../types/api';
import ArticleItem from './ArticlesItem';
import WriteButton from './WriteButton';

export interface ArticlesProps {
  articles: Article[];
  showWriteButton?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage(): void;
  refetch(): void;
  isRefreshing: boolean;
}

function Articles({
  articles,
  showWriteButton,
  isFetchingNextPage,
  fetchNextPage,
  refetch,
  isRefreshing,
}: ArticlesProps) {
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
      ListHeaderComponent={() => (showWriteButton ? <WriteButton /> : null)}
      ListFooterComponent={() => (
        <>
          {/* articles가 1개 이상 있을 때만 최하단 테두리 보여주기 */}
          {articles.length > 0 ? <View style={styles.separator} /> : null}
          {isFetchingNextPage && (
            <ActivityIndicator size="small" style={styles.spinner} />
          )}
        </>
      )}
      onEndReached={fetchNextPage}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refetch} />
      }
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
  spinner: {
    backgroundColor: '#fff',
    paddingVertical: 32,
  },
});

export default Articles;
