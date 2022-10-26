import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {applyToken} from '../api/client';
import {useUserState} from '../states/context/UserContext';
import authStorage from '../storages/authStorage';
import {AuthError} from '../types/api';
import {RootStackNavigationProp} from '../types/screens';
import useToast from './useToast';

const useLogin = () => {
  const toast = useToast();
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const mutation = useMutation(login, {
    onSuccess: data => {
      setUser(data.user);
      navigation.pop(); // go back to previous screen
      applyToken(data.jwt);
      authStorage.set(data);
    },
    onError: (error: AuthError) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        '로그인에 실패했습니다.';
      toast({title: '오류', message});
    },
  });
  return mutation;
};

export default useLogin;
