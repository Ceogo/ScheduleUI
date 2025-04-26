import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Логотип и описание */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl text-gray-800">EduSchedule</span>
              </div>
              <p className="text-gray-600 mb-4">
                Ваша платформа для электронных расписаний для эффективного управления учебным процессом.
              </p>
            </div>

            {/* Быстрые ссылки */}
            <div className="col-span-1">
              <h4 className="text-gray-800 font-semibold mb-4">Быстрые ссылки</h4>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/" className="text-gray-600 hover:text-primary transition-colors">
                    Главная
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/schedule" className="text-gray-600 hover:text-primary transition-colors">
                    Расписание
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="text-gray-600 hover:text-primary transition-colors">
                    Войти
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
            </div>

            {/* Контактная информация */}
            <div className="col-span-1">
              <h4 className="text-gray-800 font-semibold mb-4">Свяжитесь с нами</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-gray-600">contact@eduschedule.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-gray-600">+7 (705) 772-63-00</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-gray-600">ул.Лермонтова 93, г.Павлодар 140000</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} EduSchedule. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
