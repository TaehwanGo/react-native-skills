import axios from 'axios';
import { Post } from '../types/api';

export async function getPosts() {
  const response = await axios.get<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
  );
  return response.data;
}
