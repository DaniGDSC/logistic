import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',  // or your Django server's address
});

export default api;