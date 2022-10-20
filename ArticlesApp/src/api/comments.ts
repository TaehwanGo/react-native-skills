import {Comment} from '../types/api';
import client from './client';

export async function getComments(articleId: number) {
  const response = await client.get<Comment[]>(
    `/articles/${articleId}/comments`,
  );
  return response.data;
}
