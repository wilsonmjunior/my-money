import axios from 'axios';

axios.defaults.validateStatus = code => code < 500

const api = axios.create({
  baseURL: 'https://mymoney-c13cc.firebaseio.com/',
});

export default api;