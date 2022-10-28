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

function WriteScreen() {
  const {top} = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigation = useNavigation<RootStackNavigationProp>();
  const onSubmit = useCallback(() => {
    // TODO : 구현 예정
  }, []);

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
