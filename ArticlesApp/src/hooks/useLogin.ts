import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {AuthError} from '../types/api';

const useLogin = () => {
  const mutation = useMutation(login, {
    onSuccess: data => {
      console.log('data', data);
      // TODO: 구현 예정
    },
    onError: (error: AuthError) => {
      console.log('error', error);
      // TODO: 구현 예정
    },
  });
  return mutation;
};

export default useLogin;
