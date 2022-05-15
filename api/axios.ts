import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.todaytoon.me/webtoon'
});

export default instance