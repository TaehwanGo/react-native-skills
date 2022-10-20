import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getArticle} from '../../api/articles';
import {getComments} from '../../api/comments';
import {RootStackParamList} from '../../types/screens';
import ArticleView from '../ArticleView';
import CommentItem from '../CommentItem';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  const {bottom} = useSafeAreaInsets(); // 하단 필수 여백 - iOS 홈버튼 없는 것 대응

  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={[styles.flatListContent, {paddingBottom: bottom}]}
      data={commentsQuery.data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <CommentItem
          id={item.id}
          message={item.message}
          publishedAt={item.published_at}
          username={item.user.username}
        />
      )}
      ListHeaderComponent={
        <ArticleView
          title={title}
          body={body}
          publishedAt={published_at}
          username={user.username}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

export default ArticleScreen;
