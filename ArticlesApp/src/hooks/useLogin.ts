import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {applyToken} from '../api/client';
import {useUserState} from '../states/context/UserContext';
import {AuthError} from '../types/api';
import {RootStackNavigationProp} from '../types/screens';

const useLogin = () => {
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const mutation = useMutation(login, {
    onSuccess: data => {
      setUser(data.user);
      navigation.pop(); // go back to previous screen
      applyToken(data.jwt);
    },
    onError: (error: AuthError) => {
      console.log('error', error);
      console.log(error.response?.data);
      // TODO: 구현 예정
    },
  });
  return mutation;
};

export default useLogin;
