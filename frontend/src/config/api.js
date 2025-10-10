
import axios from 'axios';
// const DEPLOYED='https://api.paze3.com/'
// const LOCALHOST='https://ecom2backend.vercel.app';
// const LOCALHOST='http://localhost:5454';

const LOCALHOST='https://apit.shopssy.shop';



export const API_BASE_URL = LOCALHOST;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem('jwt');

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
