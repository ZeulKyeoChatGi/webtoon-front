import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://13.125.46.14:80/webtoon'
});

export default instance