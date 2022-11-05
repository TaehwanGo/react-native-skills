import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import {writeComment} from '../api/comments';
import {Comment} from '../types/api';
import CommentModal from './CommentModal';

export interface CommentInputProps {
  articleId: number; // 댓글 목록 갱신에 사용 됨
}

export default function CommentInput({articleId}: CommentInputProps) {
  const [writingComment, setWritingComment] = useState(false);
  const queryClient = useQueryClient();
  const {mutate} = useMutation(writeComment, {
    onSuccess: comment => {
      queryClient.setQueryData<Comment[]>(['comments', articleId], comments =>
        (comments || []).concat(comment),
      );
    },
  });
  const onPress = () => {
    setWritingComment(true);
  };
  const onClose = () => {
    setWritingComment(false);
  };
  const onSubmit = (message: string) => {
    setWritingComment(false);
    mutate({articleId, message});
  };
  return (
    <>
      <Pressable style={styles.block} onPress={onPress}>
        <Text style={styles.text}>댓글을 입력하세요</Text>
      </Pressable>
      <CommentModal
        onClose={onClose}
        visible={writingComment}
        onSubmit={onSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    color: '#898989',
  },
});
