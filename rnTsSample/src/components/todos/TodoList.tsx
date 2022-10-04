import React from 'react';
import { FlatList, View } from 'react-native';
import useTodos from '../../hooks/useTodos';
import { todoStyles } from '../../styles/todos';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useTodos();
  return (
    <FlatList
      style={todoStyles.container}
      data={todos}
      renderItem={({ item }) => (
        <TodoItem id={item.id} text={item.text} done={item.done} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={todoStyles.separator} />}
      ListFooterComponent={() => <View style={todoStyles.separator} />}
    />
  );
};

export default TodoList;
