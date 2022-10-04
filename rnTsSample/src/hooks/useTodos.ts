import { useSelector } from 'react-redux';
import { RootState } from '../states/redux/slice';

export default function useTodos() {
  return useSelector((state: RootState) => state.todos);
}
