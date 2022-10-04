import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const initialState: Todo[] = [
  { id: 1, text: '타입스크립트 배우기', done: true },
  { id: 2, text: '타입스크립트와 리덕스 함께 사용하기', done: false },
];

let nextId = 3; // 새 항목을 추가할 때 사용할 고유 ID

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 액션 생성 함수가 호출되어 액션을 만들기 전에 특정 작업을 수행
    // add('리덕스 배우기') => { type: 'todos/add', payload: {id: 1, text: '리덕스 배우기', done: false} }
    add: {
      // 액션 객체를 만들 때 커스터 마이징 할 수 있음
      prepare(text: string) {
        const prepared = { payload: { id: nextId, text, done: false } };
        nextId += 1;
        return prepared;
      },
      // prepare에서 만든 액션 객체를 받아서 state를 업데이트
      reducer(state, action: PayloadAction<Todo>) {
        state.push(action.payload);
      },
    },
    // id로 원하는 원소 제거
    remove(state, action: PayloadAction<number>) {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggle(state, action: PayloadAction<number>) {
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      );
    },
  },
});

export const { add, remove, toggle } = todos.actions;
export default todos.reducer;
