import { useSelector } from 'react-redux';
import { RootState } from '../states/redux/slice';

export default function useUser() {
  return useSelector((state: RootState) => state.auth.user);
}
