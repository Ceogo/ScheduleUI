import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Calendar, LogIn } from 'lucide-react';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''} ${transparent ? 'text-white/80 hover:text-white' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/schedule" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''} ${transparent ? 'text-white/80 hover:text-white' : ''}`
              }
            >
              Schedule
            </NavLink>
            <NavLink 
              to="/login" 
              className={`btn ${transparent ? 'bg-white text-primary' : 'btn-primary'} ml-4`}
            >
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Login
              </span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen 
              ? <X className={`h-6 w-6 ${transparent ? 'text-white' : 'text-gray-800'}`} /> 
              : <Menu className={`h-6 w-6 ${transparent ? 'text-white' : 'text-gray-800'}`} />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/schedule" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </NavLink>
              <NavLink 
                to="/login"
                className="btn btn-primary mx-4 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" /> Login
                </span>
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;