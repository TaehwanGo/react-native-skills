import React from 'react';
import {AuthProvider} from './store/context/AuthContext';
import Counter from './components/Counter';

function App() {
  return (
    <AuthProvider>
      <Counter />
    </AuthProvider>
  );
}

export default App;
