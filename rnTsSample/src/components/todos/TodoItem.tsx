import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { todoStyles } from '../../styles/todos';
import BlackButton from './BlackButton';

interface TodoItemProps {
  id: number;
  text: string;
  done: boolean;
}
const TodoItem = ({ id, text, done }: TodoItemProps) => {
  const onToggle = () => {
    console.log('onToggle', id);
  };
  const onRemove = () => {
    console.log('onRemove', id);
  };

  return (
    <View style={todoStyles.todo}>
      <Pressable onPress={onToggle} style={todoStyles.toggle}>
        <Text style={done && todoStyles.doneText}>{text}</Text>
      </Pressable>
      <BlackButton onPress={onRemove} title="삭제" />
    </View>
  );
};

export default TodoItem;
