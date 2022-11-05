import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
import {deleteArticle} from '../api/articles';
import {Article} from '../types/api';
import {RootStackNavigationProp} from '../types/screens';
import AskDialog from './AskDialog';

interface ArticleActionButtonsProps {
  articleId: number;
}
function ArticleActionButtons({articleId}: ArticleActionButtonsProps) {
  const [askRemove, setAskRemove] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();

  const {mutate} = useMutation(deleteArticle, {
    onSuccess: () => {
      navigation.goBack();
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        if (!data) {
          return {
            pageParams: [],
            pages: [],
          };
        }

        return {
          pageParams: data.pageParams,
          pages: data.pages.map(page =>
            page.find(article => article.id === articleId) // 수정할 항목이 있는 페이지를 찾고
              ? page.filter(article => article.id !== articleId) // articleId와 일치하지 않는 항목만 남긴다.
              : page,
          ),
        };
      });
    },
  });

  const onPressModify = () => {
    navigation.navigate('Write', {articleId});
  };
  const onPressRemove = () => {
    setAskRemove(true);
  };

  const onCancelRemove = () => {
    setAskRemove(false);
  };
  const onConfirmRemove = () => {
    setAskRemove(false);
    mutate(articleId);
  };

  return (
    <>
      <View style={styles.block}>
        <Pressable
          style={({pressed}) => pressed && styles.pressed}
          onPress={onPressModify}>
          <Text style={styles.buttonText}>수정</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          style={({pressed}) => pressed && styles.pressed}
          onPress={onPressRemove}>
          <Text style={styles.buttonText}>삭제</Text>
        </Pressable>
      </View>
      <AskDialog
        visible={askRemove}
        title="게시글 삭제"
        message="게시글을 삭제하시겠습니까?"
        isDestructive
        confirmText="삭제"
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: -16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  separator: {
    width: 8,
  },
  buttonText: {
    color: '#2196f3',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ArticleActionButtons;
