import React, { useState } from 'react';
import {
  CalendarDays,
  BookOpen,
  User,
  Bell,
  Calendar,
  FileText,
  Clock,
  Download
} from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import ScheduleTable from '../components/ScheduleTable';

// Мок-данные с переводом
const mockTimeSlots = [
  {
    time: '8:00 - 9:30',
    events: {
      Monday: [
        { id: '1', title: 'Математика', location: 'Ауд. 101', time: '8:00 - 9:30' }
      ],
      Tuesday: [
        { id: '2', title: 'Физика', location: 'Ауд. 102', time: '8:00 - 9:30' }
      ],
      Wednesday: [
        { id: '3', title: 'Химия', location: 'Ауд. 103', time: '8:00 - 9:30' }
      ],
      Thursday: [],
      Friday: [
        { id: '4', title: 'Биология', location: 'Ауд. 104', time: '8:00 - 9:30' }
      ]
    }
  },
  {
    time: '9:45 - 11:15',
    events: {
      Monday: [
        { id: '5', title: 'История', location: 'Ауд. 201', time: '9:45 - 11:15' }
      ],
      Tuesday: [],
      Wednesday: [
        { id: '6', title: 'Литература', location: 'Ауд. 202', time: '9:45 - 11:15' }
      ],
      Thursday: [
        { id: '7', title: 'Информатика', location: 'Ауд. 303', time: '9:45 - 11:15' }
      ],
      Friday: [
        { id: '8', title: 'Искусство', location: 'Ауд. 204', time: '9:45 - 11:15' }
      ]
    }
  }
];

const mockAssignments = [
  { id: '1', title: 'Набор задач по математике', dueDate: '15.10.2023', course: 'Математика', status: 'pending' },
  { id: '2', title: 'Лабораторный отчет по физике', dueDate: '18.10.2023', course: 'Физика', status: 'completed' },
  { id: '3', title: 'Эссе по литературе', dueDate: '20.10.2023', course: 'Литература', status: 'pending' },
  { id: '4', title: 'Эксперимент по химии', dueDate: '22.10.2023', course: 'Химия', status: 'pending' },
];

const StudentDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState(mockAssignments);

  const sidebarLinks = [
    { to: '/student-dashboard', label: 'Панель управления', icon: <Calendar className="h-5 w-5" /> },
    { to: '/schedule', label: 'Расписание', icon: <CalendarDays className="h-5 w-5" /> },
    { to: '/assignments', label: 'Задания', icon: <FileText className="h-5 w-5" /> },
    { to: '/profile', label: 'Профиль', icon: <User className="h-5 w-5" /> },
    { to: '/notifications', label: 'Уведомления', icon: <Bell className="h-5 w-5" /> },
  ];

  // Получение текущего дня недели
  const getTodayClasses = () => {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' });
    const todayClasses = [];

    for (const slot of mockTimeSlots) {
      const events = slot.events[today as keyof typeof slot.events];
      if (events && events.length > 0) {
        todayClasses.push(...events);
      }
    }

    return todayClasses;
  };

  // Обработчик для скачивания расписания
  const handleDownloadSchedule = () => {
    alert('Скачивание расписания... (Функционал в разработке)');
    // Здесь можно добавить логику для генерации PDF или другого формата
  };

  // Обработчик для просмотра уведомлений
  const handleViewNotifications = () => {
    window.location.href = '/notifications';
  };

  // Обработчик для переключения статуса задания
  const toggleAssignmentStatus = (id: string) => {
    setAssignments(prev =>
        prev.map(assignment =>
            assignment.id === id
                ? {
                  ...assignment,
                  status: assignment.status === 'completed' ? 'pending' : 'completed',
                }
                : assignment
        )
    );
  };

  const todayClasses = getTodayClasses();

  return (
      <SidebarLayout
          links={sidebarLinks}
          title="Панель студента"
          userRole="Студент"
          userName="Алексей Иванов"
      >
        {/* Быстрые действия */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
              className="btn btn-primary flex items-center gap-2"
              onClick={handleDownloadSchedule}
          >
            <Download className="h-5 w-5" /> Скачать расписание
          </button>
          <button
              className="btn btn-secondary flex items-center gap-2"
              onClick={handleViewNotifications}
          >
            <Bell className="h-5 w-5" /> Посмотреть уведомления
          </button>
        </div>

        {/* Занятия сегодня */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Занятия сегодня</h2>
          {todayClasses.length === 0 ? (
              <p className="text-gray-600">Сегодня нет занятий.</p>
          ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {todayClasses.map(event => (
                    <div key={event.id} className="card bg-primary/5 border-l-4 border-l-primary">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{event.title}</h3>
                          <p className="text-gray-600">{event.location}</p>
                        </div>
                        <div className="flex items-center text-primary">
                          <Clock className="h-5 w-5 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </section>

        {/* Предстоящие задания */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Предстоящие задания</h2>
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              Посмотреть все
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="table-header">Задание</th>
                <th className="table-header">Курс</th>
                <th className="table-header">Срок сдачи</th>
                <th className="table-header">Статус</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map(assignment => (
                  <tr key={assignment.id}>
                    <td className="table-cell font-medium">{assignment.title}</td>
                    <td className="table-cell">{assignment.course}</td>
                    <td className="table-cell">{assignment.dueDate}</td>
                    <td className="table-cell">
                      <button
                          onClick={() => toggleAssignmentStatus(assignment.id)}
                          className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                              assignment.status === 'completed'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                      >
                        {assignment.status === 'completed' ? 'Завершено' : 'В ожидании'}
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Недельное расписание */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Недельное расписание</h2>
          <ScheduleTable
              timeSlots={mockTimeSlots}
              currentWeek="9 октября - 13 октября 2023"
          />
        </section>
      </SidebarLayout>
  );
};

export default StudentDashboard;