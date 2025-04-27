import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, LogOut, Menu, X } from 'lucide-react';

interface SidebarLayoutProps {
  children: ReactNode;
  links: {
    to: string;
    label: string;
    icon: React.ReactNode;
  }[];
  title: string;
  userRole: string;
  userName: string;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
                                                       children,
                                                       links,
                                                       title,
                                                       userRole,
                                                       userName,
                                                     }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center gap-2 p-6 border-b border-gray-100">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-gray-800">EduSchedule</span>
          </div>
          <div className="p-4 border-b border-gray-100">
            <div className="font-medium text-gray-800">{userName}</div>
            <div className="text-sm text-gray-500">{userRole}</div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`
                    }
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </NavLink>
            ))}
            <NavLink
                to="/login"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-500 hover:bg-red-50 hover:text-red-700 mt-8"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Выйти
            </NavLink>
          </nav>
        </aside>

        {/* Mobile Header with Menu Button */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-gray-800">EduSchedule</span>
            </div>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2"
                aria-label="Переключить меню"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-10 bg-gray-900/50">
              <div className="absolute top-0 left-0 w-64 h-full bg-white animate-slide-in">
                <div className="p-4 border-b border-gray-100">
                  <div className="font-medium text-gray-800">{userName}</div>
                  <div className="text-sm text-gray-500">{userRole}</div>
                </div>
                <nav className="p-4 space-y-1">
                  {links.map((link) => (
                      <NavLink
                          key={link.to}
                          to={link.to}
                          className={({ isActive }) =>
                              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                  isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                              }`
                          }
                          onClick={() => setIsSidebarOpen(false)}
                      >
                        <span className="mr-3">{link.icon}</span>
                        {link.label}
                      </NavLink>
                  ))}
                  <NavLink
                      to="/login"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-500 hover:bg-red-50 hover:text-red-700 mt-8"
                      onClick={() => setIsSidebarOpen(false)}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Выйти
                  </NavLink>
                </nav>
              </div>
            </div>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 md:py-8 md:px-10 flex flex-col h-full overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
            {children}
          </div>
        </main>
      </div>
  );
};

export default SidebarLayout;