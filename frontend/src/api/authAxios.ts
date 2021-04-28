import axios from 'axios';
import baseUrl from '../config/config';

const authAxios = axios.create({ baseURL: baseUrl });

authAxios.interceptors.request.use((req) => {
  if (sessionStorage.getItem('user')) {
    const token = JSON.parse(sessionStorage.getItem('user') as string).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export default authAxios;
