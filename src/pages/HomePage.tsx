import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Users, Lock, Layout } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

const HomePage: React.FC = () => {
  return (
      <div className="flex flex-col min-h-screen">
        {/* Секция героя */}
        <section className="relative bg-primary text-white">
          <Header transparent={true} />

          <div className="container mx-auto px-4 py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Ваша платформа для электронного расписания
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Легко управляйте расписаниями студентов, преподавателей и администраторов
              </p>
              <NavLink
                  to="/login"
                  className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
              >
                Начать
              </NavLink>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
        </section>

        {/* Секция преимуществ */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Оптимизируйте ваше образовательное расписание
              </h2>
              <p className="text-xl text-gray-600">
                Наша платформа предлагает мощные инструменты для управления и оптимизации учебных расписаний
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                  icon={<Calendar className="h-12 w-12" />}
                  title="Просмотр расписания"
                  description="Получайте доступ к своему расписанию в любое время и в любом месте. Фильтрация по дню, неделе или месяцу."
              />
              <FeatureCard
                  icon={<Layout className="h-12 w-12" />}
                  title="Управление занятиями"
                  description="Для преподавателей и администраторов: легко создавайте, редактируйте и организуйте занятия и события."
              />
              <FeatureCard
                  icon={<Lock className="h-12 w-12" />}
                  title="Безопасный доступ"
                  description="Аутентификация по ролям гарантирует, что пользователи видят только то, что им нужно."
              />
              <FeatureCard
                  icon={<Users className="h-12 w-12" />}
                  title="Разные роли"
                  description="Специализированные интерфейсы для студентов, преподавателей и администраторов."
              />
              <FeatureCard
                  icon={<Calendar className="h-12 w-12" />}
                  title="Обзор недели"
                  description="Получите полный обзор вашей недели для более эффективного планирования времени."
              />
              <FeatureCard
                  icon={<Layout className="h-12 w-12" />}
                  title="Адаптивный дизайн"
                  description="Доступ к расписанию с любого устройства — компьютера, планшета или смартфона."
              />
            </div>
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Готовы оптимизировать ваше образовательное расписание?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Присоединяйтесь к тысячам учебных заведений, уже использующих нашу платформу для упрощения процессов планирования.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink
                    to="/login"
                    className="btn btn-primary px-8 py-3 text-lg"
                >
                  Начать
                </NavLink>
                <NavLink
                    to="/schedule"
                    className="btn btn-secondary px-8 py-3 text-lg"
                >
                  Посмотреть расписание
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
};

export default HomePage;
