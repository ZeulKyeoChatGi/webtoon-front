import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.todaytoon.me/webtoon'
});

export const fetcher = <T>(url: string): Promise<T> => instance.get<T>(url).then(({ data }) => data);

export default instance;
