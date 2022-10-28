import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackNavigationProp} from '../../types/screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useMutation, useQueryClient} from 'react-query';
import {writeArticle} from '../../api/articles';
import {Article} from '../../types/api';

function WriteScreen() {
  const {top} = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();
  const {mutate: write} = useMutation(writeArticle, {
    onSuccess: article => {
      // queryClient.invalidateQueries('articles'); // 새로운 글을 작성하면 articles 쿼리를 다시 요청하도록 설정

      // 캐시 데이터에 새로운 글을 추가
      // const articles = queryClient.getQueryData<Article[]>('articles') ?? []; // articles 쿼리의 (캐싱된)데이터를 가져옴
      // queryClient.setQueryData('articles', articles.concat(article)); // 새로운 글을 articles 쿼리의 데이터에 추가

      // 캐시 데이터에 새로운 글 추가 축약버전
      queryClient.setQueryData<Article[]>('articles', articles => {
        return (articles ?? []).concat(article);
      });
      navigation.goBack();
    },
  });

  const navigation = useNavigation<RootStackNavigationProp>();
  const onSubmit = useCallback(() => {
    write({title, body});
  }, [title, body, write]);

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
