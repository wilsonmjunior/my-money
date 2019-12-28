import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mymoney-c13cc.firebaseio.com/',
});

export default api;