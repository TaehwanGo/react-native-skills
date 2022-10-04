import React from 'react';
import { Provider } from 'react-redux';
import store from './states/redux/store';
import TodoApp from './components/todos/TodoApp';

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
