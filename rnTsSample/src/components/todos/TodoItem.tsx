import React from 'react';
import { Pressable, Text, View } from 'react-native';
import useTodosActions from '../../hooks/useTodosActions';
import { todoStyles } from '../../styles/todos';
import BlackButton from './BlackButton';

interface TodoItemProps {
  id: number;
  text: string;
  done: boolean;
}
const TodoItem = ({ id, text, done }: TodoItemProps) => {
  const { toggle, remove } = useTodosActions();
  const onToggle = () => {
    toggle(id);
  };
  const onRemove = () => {
    remove(id);
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
