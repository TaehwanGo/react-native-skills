import {Article} from '../types/api';
import client from './client';

export async function getArticles() {
  const response = await client.get<Article[]>('/articles');
  return response.data;
}
