import {AuthResult, LoginParams, RegisterParams, User} from '../types/api';
import client from './client';

export async function register(params: RegisterParams) {
  const response = await client.post<AuthResult>('/auth/register', params);
  return response.data;
}

export async function login(params: LoginParams) {
  const response = await client.post<AuthResult>('/auth/local', params);
  return response.data;
}

export async function getLoginStatus() {
  const response = await client.get<User>('/users/me');
  return response.data;
}
