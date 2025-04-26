import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, School, BookOpen, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Role = 'student' | 'teacher' | 'admin';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      const dashboardMap: Record<Role, string> = {
        student: '/student-dashboard',
        teacher: '/teacher-dashboard',
        admin: '/admin-dashboard',
      };
      navigate(dashboardMap[role]);
    } catch (err) {
      setError('Ошибка входа. Проверьте email и пароль.');
    }
  };

  return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
          <div className="card max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Вход в EduSchedule</h1>
              <p className="text-gray-600">Доступ к вашей персональной панели</p>
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
              <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 py-3 px-4 flex flex-col items-center text-sm font-medium ${
                      role === 'admin'
                          ? 'bg-primary/10 text-primary border-b-2 border-primary'
                          : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Users className="h-5 w-5 mb-1" />
                Админ
              </button>
            </div>

            <form onSubmit={handleSubmit}>
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

              <div className="mb-6">
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
                <div className="mt-1 text-right">
                  <a href="#" className="text-sm text-primary hover:text-primary-dark">
                    Забыли пароль?
                  </a>
                </div>
              </div>

              <button
                  type="submit"
                  className="btn btn-primary w-full py-3"
              >
                Войти
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Нет аккаунта?{' '}
                <a href="/register" className="text-primary hover:text-primary-dark">
                  Зарегистрироваться
                </a>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default LoginPage;