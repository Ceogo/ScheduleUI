import axios from 'axios';
import { User } from '../types';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

export const auth = {
    login: (data: { email: string; password: string; role: string }) =>
        api.post<{ token: string }>('/api/login', data),
    register: (data: { name: string; email: string; password: string; role: string }) =>
        api.post<{ token: string }>('/api/register', data),
    logout: () => api.post('/api/logout'),
    getUser: () => api.get<User>('/api/user'),
};