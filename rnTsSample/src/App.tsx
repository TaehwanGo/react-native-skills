import React from 'react';
import { Provider } from 'react-redux';
import store from './\bstates/redux/store';
import AuthApp from './components/auth/AuthApp';

function App() {
  return (
    <Provider store={store}>
      <AuthApp />
    </Provider>
  );
}

export default App;
