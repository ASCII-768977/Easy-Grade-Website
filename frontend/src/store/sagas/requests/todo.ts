import axios, { AxiosResponse } from 'axios';
import { apiGetOneTodo, apiGetTodoList } from '../../../api/api';

export const requestTodoList = async (): Promise<AxiosResponse> => {
  const requestUrl = apiGetTodoList();
  return await axios.get(requestUrl);
};

export const requestOneTodo = async (todoId: number): Promise<AxiosResponse> => {
  const requestUrl = apiGetOneTodo(todoId);
  return await axios.get(requestUrl);
};
