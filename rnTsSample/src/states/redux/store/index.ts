import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../slice';

const store = configureStore({
  reducer: rootReducer,
});

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export default store;
