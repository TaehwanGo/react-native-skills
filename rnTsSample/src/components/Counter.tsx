import React, { useEffect, useReducer } from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../states/context/AuthContext';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 1,
};

type IncrementAction = { type: 'increment' };
type DecrementAction = { type: 'decrement'; by: number };
type CounterAction = IncrementAction | DecrementAction;

function reducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 };
    case 'decrement':
      return { value: state.value - action.by };
    default:
      throw new Error('Unhandled action type');
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, setUser } = useAuth();

  useEffect(() => {
    console.log('user', user);
  }, [user]);
  return (
    <View>
      <Text>Counter: {state.value}</Text>
      <Button
        title="+1"
        onPress={() => {
          dispatch({ type: 'increment' });
          setUser({ id: 1, name: 'test' });
        }}
      />
      <Button
        title="-1"
        onPress={() => {
          dispatch({ type: 'decrement', by: 1 });
          setUser({ id: 2, name: 'test2' });
        }}
      />
    </View>
  );
};

export default Counter;
