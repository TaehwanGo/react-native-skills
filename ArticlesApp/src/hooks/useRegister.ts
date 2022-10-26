import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {register} from '../api/auth';
import {applyToken} from '../api/client';
import {useUserState} from '../states/context/UserContext';
import {AuthError} from '../types/api';
import {RootStackNavigationProp} from '../types/screens';

const useRegister = () => {
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const mutation = useMutation(register, {
    onSuccess: data => {
      setUser(data.user);
      navigation.pop();
      applyToken(data.jwt);
    },
    onError: (error: AuthError) => {
      console.log('error', error);
    },
  });

  return mutation;
};

export default useRegister;
