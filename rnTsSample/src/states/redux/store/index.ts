import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../slice';

/**
 * configureStore엔 thunk 미들웨어가 내장되어 있다
 */
const store = configureStore({
  reducer: rootReducer,
});

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export default store;
