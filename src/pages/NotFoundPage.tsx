import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Calendar className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Страница не найдена</h2>
        
        <p className="text-gray-600 mb-8">
          Как вы здесь оказались? Этой страницы не существует
        </p>
        
        <NavLink 
          to="/" 
          className="btn btn-primary py-3 px-8 flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-5 w-5" />
          На главную
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;