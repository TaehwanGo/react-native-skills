import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

// RootState는 나중에 useSelector를 사용할 때 필요합니다.
export type RootState = ReturnType<typeof rootReducer>; // ReturnType을 사용하면 함수의 반환 타입을 추론할 수 있습니다.

export default rootReducer;
