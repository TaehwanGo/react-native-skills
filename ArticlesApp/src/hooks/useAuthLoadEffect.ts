import {useEffect} from 'react';
import {applyToken} from '../api/client';
import {useUserState} from '../states/context/UserContext';
import authStorage from '../storages/authStorage';

export default function useAuthLoadEffect() {
  const [, setUser] = useUserState();

  useEffect(() => {
    authStorage.get().then(data => {
      if (data) {
        setUser(data.user);
        applyToken(data.jwt);
      }
    });
  }, [setUser]);
}
