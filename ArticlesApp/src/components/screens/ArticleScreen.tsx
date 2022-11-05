import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getArticle} from '../../api/articles';
import {deleteComment, getComments} from '../../api/comments';
import {useUserState} from '../../states/context/UserContext';
import {Comment} from '../../types/api';
import {RootStackParamList} from '../../types/screens';
import ArticleView from '../ArticleView';
import AskDialog from '../AskDialog';
import CommentInput from '../CommentInput';
import CommentItem from '../CommentItem';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;
  const [currentUser] = useUserState();

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  const {bottom} = useSafeAreaInsets(); // 하단 필수 여백 - iOS 홈버튼 없는 것 대응

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [askRemoveComment, setAskRemoveComment] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const {mutate: removeComment} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments
          ? comments.filter(comment => comment.id !== selectedCommentId)
          : [],
      );
    },
  });

  const onRemoveComment = (commentId: number) => {
    setSelectedCommentId(commentId);
    setAskRemoveComment(true);
  };

  const onConfirmRemoveComment = () => {
    setAskRemoveComment(false);
    removeComment({
      id: selectedCommentId!,
      articleId: id,
    });
  };

  const onCancelRemoveComment = () => {
    setAskRemoveComment(false);
  };

  const onModifyComment = (commentId: number) => {
    console.log('modify comment', commentId);
    setAskRemoveComment(false);
  };

  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;
  const isMyArticle = currentUser?.id === user.id;

  return (
    <>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={[
          styles.flatListContent,
          {paddingBottom: bottom},
        ]}
        data={commentsQuery.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            message={item.message}
            publishedAt={item.published_at}
            username={item.user.username}
            isMyComment={currentUser?.id === item.user.id}
            onRemove={onRemoveComment}
            onModify={onModifyComment}
          />
        )}
        ListHeaderComponent={
          <>
            <ArticleView
              title={title}
              body={body}
              publishedAt={published_at}
              username={user.username}
              id={id}
              isMyArticle={isMyArticle}
            />
            <CommentInput articleId={id} />
          </>
        }
      />
      <AskDialog
        visible={askRemoveComment}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
        isDestructive
        confirmText="삭제"
        onConfirm={onConfirmRemoveComment}
        onClose={onCancelRemoveComment}
      />
    </>
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
