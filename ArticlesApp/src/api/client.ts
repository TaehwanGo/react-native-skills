import axios from 'axios';
import {Platform} from 'react-native';

// __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있습니다.
const baseURL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:1337'
    : 'http://localhost:1337' // strapi 서버의 주소
  : 'https://articles.example.com'; // 프로덕션 배포 주소(가정)

const client = axios.create({
  baseURL,
});

export default client;
