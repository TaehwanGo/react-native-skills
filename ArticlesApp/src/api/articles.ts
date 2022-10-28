import {Article} from '../types/api';
import client from './client';

export async function getArticles({
  limit = 10,
  cursor,
  preCursor,
}: {
  limit?: number;
  cursor?: number;
  preCursor?: number;
}) {
  const response = await client.get<Article[]>('/articles', {
    params: {
      _sort: 'id:DESC',
      _limit: limit,
      id_lt: cursor,
      id_gt: preCursor, // gt: greater than
    },
  });
  return response.data;
}

export async function getArticle(id: number) {
  const response = await client.get<Article>(`/articles/${id}`);
  return response.data;
}

export async function writeArticle(params: {title: string; body: string}) {
  const response = await client.post<Article>('/articles', params);
  return response.data;
}
