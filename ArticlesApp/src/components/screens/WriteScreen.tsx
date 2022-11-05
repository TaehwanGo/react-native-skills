import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackNavigationProp, RootStackParamList} from '../../types/screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
import {modifyArticle, writeArticle} from '../../api/articles';
import {Article} from '../../types/api';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

function WriteScreen() {
  const {params} = useRoute<WriteScreenRouteProp>();
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const cachedArticle = useMemo(
    () =>
      params.articleId
        ? queryClient.getQueryData<Article>(['article', params.articleId])
        : null,
    [params.articleId, queryClient],
  );

  const [title, setTitle] = useState(cachedArticle?.title ?? ''); // 초기값을 이렇게 할 수도 있구나
  const [body, setBody] = useState(cachedArticle?.body ?? '');

  const {mutate: write} = useMutation(writeArticle, {
    onSuccess: article => {
      // queryClient.invalidateQueries('articles'); // 새로운 글을 작성하면 articles 쿼리를 다시 요청하도록 설정

      // 캐시 데이터에 새로운 글을 추가
      // const articles = queryClient.getQueryData<Article[]>('articles') ?? []; // articles 쿼리의 (캐싱된)데이터를 가져옴
      // queryClient.setQueryData('articles', articles.concat(article)); // 새로운 글을 articles 쿼리의 데이터에 추가

      // 캐시 데이터에 새로운 글 추가 축약버전
      // queryClient.setQueryData<Article[]>('articles', articles => {
      //   return (articles ?? []).concat(article);
      // });

      // 페이지네이션(useInfiniteQuery)을 사용할 때는 캐시 데이터에 새로운 글을 추가하는 대신, 새로운 글을 포함한 새로운 페이지를 추가
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[article]],
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[article, ...firstPage], ...rest],
        };
      });
      navigation.goBack();
    },
  });

  const {mutate: modify} = useMutation(modifyArticle, {
    onSuccess: article => {
      // 게시글 목록 수정
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        // data의 타입이 undefined가 아님을 명시 하기 위해 추가
        // modify의 경우엔 data가 무조건 유효하기 때문에 실제로 실행될 일은 없음
        if (!data) {
          return {
            pageParams: [],
            pages: [],
          };
        }

        return {
          pageParams: data.pageParams,
          pages: data.pages.map(page =>
            page.find(item => item.id === article.id)
              ? page.map(item => (item.id === article.id ? article : item))
              : page,
          ),
        };
      });
    },
  });

  const navigation = useNavigation<RootStackNavigationProp>();
  const onSubmit = useCallback(() => {
    if (params.articleId) {
      modify({id: params.articleId, title, body});
    } else {
      write({title, body});
    }
  }, [title, body, write, modify, params.articleId]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          hitSlop={8}
          onPress={onSubmit}
          style={({pressed}) => pressed && styles.headerRightPressed}>
          <MaterialIcons name="send" size={24} color="#2196f3" />
        </Pressable>
      ),
    });
  }, [navigation, onSubmit]);

  return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={Platform.select({ios: top + 60})}>
        <TextInput
          placeholder="제목"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="내용"
          style={[styles.input, styles.body]}
          multiline
          textAlignVertical="top"
          value={body}
          onChangeText={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 16,
  },
  headerRightPressed: {
    opacity: 0.75,
  },
});

export default WriteScreen;
