import React from 'react';
import { FlatList, View } from 'react-native';
import { todoStyles } from '../../styles/todos';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = [
    { id: 1, text: 'todo1', done: true },
    { id: 2, text: 'todo2', done: false },
  ];
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
