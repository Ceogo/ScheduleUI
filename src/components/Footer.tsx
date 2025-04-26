import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-gray-800">EduSchedule</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your electronic schedule platform for efficient management of educational timetables.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/schedule" className="text-gray-600 hover:text-primary transition-colors">
                  Schedule
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="text-gray-600 hover:text-primary transition-colors">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Dashboards */}
          <div className="col-span-1">
            <h4 className="text-gray-800 font-semibold mb-4">Dashboards</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/student-dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  Student Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/teacher-dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  Teacher Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  Admin Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h4 className="text-gray-800 font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-gray-600">contact@eduschedule.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-gray-600">123 Education St, Learning City, 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} EduSchedule. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;