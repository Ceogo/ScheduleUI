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
            const cachedUser = localStorage.getItem('authUser');

            if (token && cachedUser) {
                try {
                    setUser(JSON.parse(cachedUser));
                    setLoading(false);
                } catch (error) {
                    console.error('Ошибка парсинга кэшированного пользователя:', error);
                    await validateToken(token);
                }
            } else if (token) {
                // Если есть токен, но нет кэша пользователя, проверяем токен
                await validateToken(token);
            } else {
                setLoading(false);
            }
        };

        const validateToken = async (token: string) => {
            try {
                const { data } = await auth.getUser();
                localStorage.setItem('authUser', JSON.stringify(data));
                setUser(data);
            } catch (error) {
                console.error('Ошибка проверки токена:', error);
                await logout();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string, role: string) => {
        const { data } = await auth.login({ email, password, role });
        localStorage.setItem('authToken', data.token);
        const { data: userData } = await auth.getUser();
        localStorage.setItem('authUser', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        try {
            await auth.logout();
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
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