import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { todoStyles } from '../../styles/todos';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function TodoApp() {
  return (
    <SafeAreaView style={todoStyles.container}>
      <TodoList />
      <TodoInput />
    </SafeAreaView>
  );
}

export default TodoApp;
