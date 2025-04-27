import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  Settings,
  User,
  Bell,
  Calendar,
  Users,
  LineChart,
  Plus,
  FilePlus,
  BarChart3,
  PieChart,
  TrendingUp, Loader2,
} from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import StatCard from '../components/StatCard';
import { users, stats } from '../api';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  joined: string;
}

interface StatsData {
  totalUsers: number;
  activeStudents: number;
  activeTeachers: number;
  classesToday: number;
}

const AdminDashboard: React.FC = () => {
  const [usersData, setUsers] = useState<UserData[]>([]);
  const [statsData, setStats] = useState<StatsData>({
    totalUsers: 0,
    activeStudents: 0,
    activeTeachers: 0,
    classesToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersResponse, statsResponse] = await Promise.all([
          users.getUsers(),
          stats.getStats(),
        ]);
        setUsers(usersResponse.data);
        setStats(statsResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Ошибка загрузки данных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sidebarLinks = [
    { to: '/admin-dashboard', label: 'Дашборд', icon: <Calendar className="h-5 w-5" /> },
    { to: '/schedules', label: 'Расписания', icon: <CalendarDays className="h-5 w-5" /> },
    { to: '/users', label: 'Пользователи', icon: <Users className="h-5 w-5" /> },
    { to: '/analytics', label: 'Аналитика', icon: <LineChart className="h-5 w-5" /> },
    { to: '/profile', label: 'Профиль', icon: <User className="h-5 w-5" /> },
    { to: '/settings', label: 'Настройки', icon: <Settings className="h-5 w-5" /> },
    { to: '/notifications', label: 'Уведомления', icon: <Bell className="h-5 w-5" /> },
  ];

  const chartData = [
    { id: 1, month: 'Янв', value: 65 },
    { id: 2, month: 'Фев', value: 59 },
    { id: 3, month: 'Мар', value: 80 },
    { id: 4, month: 'Апр', value: 81 },
    { id: 5, month: 'Май', value: 56 },
    { id: 6, month: 'Июн', value: 55 },
    { id: 7, month: 'Июл', value: 40 },
    { id: 8, month: 'Авг', value: 70 },
    { id: 9, month: 'Сен', value: 90 },
    { id: 10, month: 'Окт', value: 110 },
    { id: 11, month: 'Ноя', value: 90 },
    { id: 12, month: 'Дек', value: 70 },
  ];

  const maxValue = Math.max(...chartData.map((item) => item.value));

  const handleAddUser = async () => {
    try {
      await users.createUser({
        name: 'Новый пользователь',
        email: `user${Date.now()}@example.com`,
        role: 'student',
      });
      const response = await users.getUsers();
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка добавления пользователя');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
    </div>;
  }

  if (error) {
    return (
        <div className="text-center py-8 text-red-600">
          {error}
          <button
              className="ml-4 text-primary hover:underline"
              onClick={() => setError(null)}
          >
            Очистить
          </button>
        </div>
    );
  }

  return (
      <SidebarLayout
          links={sidebarLinks}
          title="Админ-панель"
          userRole="Администратор"
          userName="Роберт Уильямс"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
              title="Всего пользователей"
              value={statsData.totalUsers}
              icon={<Users className="h-6 w-6" />}
              trend={{ value: 12, isPositive: true }}
          />
          <StatCard
              title="Активные студенты"
              value={statsData.activeStudents}
              icon={<User className="h-6 w-6" />}
              trend={{ value: 8, isPositive: true }}
          />
          <StatCard
              title="Активные преподаватели"
              value={statsData.activeTeachers}
              icon={<User className="h-6 w-6" />}
              trend={{ value: 5, isPositive: true }}
          />
          <StatCard
              title="Занятий сегодня"
              value={statsData.classesToday}
              icon={<Calendar className="h-6 w-6" />}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
              onClick={handleAddUser}
              className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" /> Добавить пользователя
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <FilePlus className="h-5 w-5" /> Создать расписание
          </button>
          <button className="btn btn-secondary flex items-center gap-2">
            <LineChart className="h-5 w-5" /> Подробные отчеты
          </button>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Рост пользователей</h3>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12%</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <div className="flex h-full items-end">
                {chartData.map((item) => (
                    <div key={item.id} className="flex-1 flex flex-col items-center">
                      <div
                          className="bg-primary/90 hover:bg-primary w-full mx-1 rounded-t-sm transition-all"
                          style={{ height: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-2 text-gray-600">{item.month}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Distribution */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Распределение пользователей</h3>
              <div className="text-gray-500">
                <PieChart className="h-5 w-5" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-primary h-4 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="ml-4 text-sm font-medium">Студенты (65%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-accent h-4 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="ml-4 text-sm font-medium">Преподаватели (25%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '8%' }}></div>
                </div>
                <span className="ml-4 text-sm font-medium">Персонал (8%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-red-500 h-4 rounded-full" style={{ width: '2%' }}></div>
                </div>
                <span className="ml-4 text-sm font-medium">Администраторы (2%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Последние пользователи</h2>
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              Посмотреть всех
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="table-header">Имя</th>
                <th className="table-header">Email</th>
                <th className="table-header">Роль</th>
                <th className="table-header">Дата регистрации</th>
                <th className="table-header">Действия</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {usersData.map((user) => (
                  <tr key={user.id}>
                    <td className="table-cell font-medium">{user.name}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">{user.role}</td>
                    <td className="table-cell">{user.joined}</td>
                    <td className="table-cell">
                      <button className="text-gray-500 hover:text-primary mr-2">
                        <User className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </section>
      </SidebarLayout>
  );
};

export default AdminDashboard;