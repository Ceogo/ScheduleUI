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
    config.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
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

export const schedule = {
    getSchedule: (params: { group_id?: string; semester?: number; week?: number }) =>
        api.get('/api/schedule', { params }),
    createSchedule: (data: {
        group_id: string;
        learning_outcome_id: string;
        day: string;
        pair_number: number;
        type: string;
        week: number;
        semester: number;
    }) => api.post('/api/schedule', data),
    updateSchedule: (id: string, data: { learning_outcome_id: string }) =>
        api.put(`/api/schedule/${id}`, data),
};

export const learningOutcomes = {
    getLearningOutcomes: () => api.get('/api/learning-outcomes'),
};

export const teacherStats = {
    getStats: () => api.get('/api/teacher-stats'),
};

export const users = {
    getUsers: (params: { role?: string } = {}) => api.get('/api/users', { params }),
    createUser: (data: { name: string; email: string; role: string; password?: string }) =>
        api.post('/api/users', data),
};

export const stats = {
    getStats: () => api.get('/api/stats'),
};