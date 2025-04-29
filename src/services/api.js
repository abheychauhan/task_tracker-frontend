import axios from 'axios';

const API = axios.create({
    baseURL: 'https://zucchini-liberation-production.up.railway.app//task-tracker',


});
// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) config.headers.Authorization = token;
//     return config;
//   });


export default API;
