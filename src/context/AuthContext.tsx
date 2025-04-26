import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../api';
import { User } from '../types';

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string, role: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const { data } = await auth.getUser();
                    setUser(data);
                } catch (error) {
                    logout();
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string, role: string) => {
        const { data } = await auth.login({ email, password, role });
        localStorage.setItem('authToken', data.token); // Сохраняем токен
        const { data: userData } = await auth.getUser();
        setUser(userData);
    };

    const logout = async () => {
        try {
            await auth.logout();
        } finally {
            localStorage.removeItem('authToken');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);