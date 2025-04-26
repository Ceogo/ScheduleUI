import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, School, BookOpen, User as UserIcon } from 'lucide-react';
import { auth } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Role = 'student' | 'teacher';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<Role>('student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Пароли не совпадают!');
            return;
        }

        try {
            await auth.register({ name, email, password, role });
            const dashboardMap: Record<Role, string> = {
                student: '/student-dashboard',
                teacher: '/teacher-dashboard',
            };
            navigate(dashboardMap[role]);
        } catch (err) {
            setError('Ошибка регистрации. Проверьте введенные данные.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
                <div className="card max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Регистрация в EduSchedule</h1>
                        <p className="text-gray-600">Создайте аккаунт, чтобы начать</p>
                    </div>

                    {error && (
                        <div className="mb-4 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex mb-6 border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`flex-1 py-3 px-4 flex flex-col items-center text-sm font-medium ${
                                role === 'student'
                                    ? 'bg-primary/10 text-primary border-b-2 border-primary'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <BookOpen className="h-5 w-5 mb-1" />
                            Студент
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('teacher')}
                            className={`flex-1 py-3 px-4 flex flex-col items-center text-sm font-medium ${
                                role === 'teacher'
                                    ? 'bg-primary/10 text-primary border-b-2 border-primary'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <School className="h-5 w-5 mb-1" />
                            Преподаватель
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Имя
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-input pl-10"
                                    placeholder="Ваше имя"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">
                                Электронная почта
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-input pl-10"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                Пароль
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-input pl-10"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="form-label">
                                Подтвердите пароль
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="form-input pl-10"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-3"
                        >
                            Зарегистрироваться
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Уже есть аккаунт?{' '}
                            <a href="/login" className="text-primary hover:text-primary-dark">
                                Войти
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RegisterPage;