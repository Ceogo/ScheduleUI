import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'student':
        return { path: '/student-dashboard', label: 'Мой дашборд' };
      case 'teacher':
        return { path: '/teacher-dashboard', label: 'Мой дашборд' };
      case 'admin':
        return { path: '/admin-dashboard', label: 'Админ-панель' };
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

  return (
      <header className={`w-full ${transparent ? 'absolute top-0 left-0 z-10' : 'bg-white shadow-sm'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2">
              <Calendar className={`h-6 w-6 ${transparent ? 'text-white' : 'text-primary'}`} />
              <span className={`font-bold text-xl ${transparent ? 'text-white' : 'text-gray-800'}`}>
              EduSchedule
            </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <NavLink
                  to="/"
                  className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                              ? 'bg-primary text-white'
                              : transparent
                                  ? 'text-white/80 hover:text-white'
                                  : 'text-gray-600 hover:bg-gray-100'
                      }`
                  }
              >
                Домой
              </NavLink>
              <NavLink
                  to="/schedule"
                  className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                              ? 'bg-primary text-white'
                              : transparent
                                  ? 'text-white/80 hover:text-white'
                                  : 'text-gray-600 hover:bg-gray-100'
                      }`
                  }
              >
                Расписание
              </NavLink>
              {user && dashboardLink && (
                  <NavLink
                      to={dashboardLink.path}
                      className={({ isActive }) =>
                          `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              isActive
                                  ? 'bg-primary text-white'
                                  : transparent
                                      ? 'text-white/80 hover:text-white'
                                      : 'text-gray-600 hover:bg-gray-100'
                          }`
                      }
                  >
                    {dashboardLink.label}
                  </NavLink>
              )}
              {user ? (
                  <div className="flex items-center gap-4 ml-4">
                <span className={`text-sm ${transparent ? 'text-white/80' : 'text-gray-600'}`}>
                  {user.name}
                </span>
                    <button
                        onClick={handleLogout}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                            transparent
                                ? 'bg-white text-primary hover:bg-gray-100'
                                : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                    >
                      <LogOut className="h-4 w-4" /> Выйти
                    </button>
                  </div>
              ) : (
                  <NavLink
                      to="/login"
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                          transparent
                              ? 'bg-white text-primary hover:bg-gray-100'
                              : 'bg-primary text-white hover:bg-primary-dark'
                      } ml-4`}
                  >
                    <LogIn className="h-4 w-4" /> Войти
                  </NavLink>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Переключить меню"
            >
              {isMenuOpen ? (
                  <X className={`h-6 w-6 ${transparent ? 'text-white' : 'text-gray-800'}`} />
              ) : (
                  <Menu className={`h-6 w-6 ${transparent ? 'text-white' : 'text-gray-800'}`} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <nav className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
                <div className="flex flex-col space-y-2 px-4">
                  <NavLink
                      to="/"
                      className={({ isActive }) =>
                          `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                          }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                  >
                    Домой
                  </NavLink>
                  <NavLink
                      to="/schedule"
                      className={({ isActive }) =>
                          `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                          }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                  >
                    Расписание
                  </NavLink>
                  {user && dashboardLink && (
                      <NavLink
                          to={dashboardLink.path}
                          className={({ isActive }) =>
                              `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                  isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                              }`
                          }
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {dashboardLink.label}
                      </NavLink>
                  )}
                  {user ? (
                      <button
                          onClick={handleLogout}
                          className="px-3 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary-dark flex items-center gap-2 text-left"
                      >
                        <LogOut className="h-4 w-4" /> Выйти
                      </button>
                  ) : (
                      <NavLink
                          to="/login"
                          className="px-3 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary-dark flex items-center gap-2"
                          onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4" /> Войти
                      </NavLink>
                  )}
                </div>
              </nav>
          )}
        </div>
      </header>
  );
};

export default Header;