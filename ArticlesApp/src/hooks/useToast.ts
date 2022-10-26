import {useCallback} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';

interface ToastParams {
  title?: string;
  message: string;
}

export default function useToast() {
  const toast = useCallback(({title, message}: ToastParams) => {
    if (Platform.OS === 'ios') {
      Alert.alert(title ?? '알림', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, []);

  return toast;
}
