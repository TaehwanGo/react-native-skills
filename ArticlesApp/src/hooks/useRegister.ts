import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {register} from '../api/auth';
import {applyToken} from '../api/client';
import {useUserState} from '../states/context/UserContext';
import authStorage from '../storages/authStorage';
import {AuthError} from '../types/api';
import {RootStackNavigationProp} from '../types/screens';
import useToast from './useToast';

const useRegister = () => {
  const toast = useToast();
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const mutation = useMutation(register, {
    onSuccess: data => {
      setUser(data.user);
      navigation.pop();
      applyToken(data.jwt);
      authStorage.set(data);
    },
    onError: (error: AuthError) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        '회원가입에 실패했습니다.';
      toast({title: '오류', message});
    },
  });

  return mutation;
};

export default useRegister;
