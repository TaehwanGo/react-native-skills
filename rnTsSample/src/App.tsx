import React from 'react';
import { Provider } from 'react-redux';
import store from './states/redux/store';
import PostsApp from './components/post/PostsApp';

function App() {
  return (
    <Provider store={store}>
      <PostsApp />
    </Provider>
  );
}

export default App;
