import React from 'react';
import { TextInput, View } from 'react-native';
import useTodosActions from '../../hooks/useTodosActions';
import { todoStyles } from '../../styles/todos';
import BlackButton from './BlackButton';

const TodoInput = () => {
  const [text, setText] = React.useState('');
  const { add } = useTodosActions();
  const onPress = () => {
    add(text);
    setText('');
  };
  return (
    <View style={todoStyles.inputWrapper}>
      <TextInput
        style={todoStyles.container}
        placeholder="할 일을 입력하세요"
        value={text}
        onChangeText={setText}
      />
      <BlackButton onPress={onPress} title="등록" />
    </View>
  );
};

export default TodoInput;
