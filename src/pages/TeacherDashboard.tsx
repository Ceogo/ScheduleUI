import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  BookOpen,
  User,
  Bell,
  Calendar,
  Edit,
  Clock,
  Users,
  Plus,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import StatCard from '../components/StatCard';
import api, { learningOutcomes, schedule, teacherStats, users } from '../api';
import { useAuth } from '../context/AuthContext';
import Modal from 'react-modal';

// Устанавливаем элемент для модального окна
Modal.setAppElement('#root');

interface Class {
  id: string;
  discipline_name: string;
  teacher_name: string;
  module_index: string;
  type: string;
  pair_number: string;
  day: string;
}

interface Group {
  id: string;
  name: string;
}

interface LearningOutcome {
  id: string;
  discipline_name: string;
  module: { index: string };
}

interface Student {
  id: string;
  name: string;
  email: string;
  role: string;
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [semester, setSemester] = useState(3);
  const [week, setWeek] = useState(1);
  const [stats, setStats] = useState({ totalClasses: 0 });
  const [learningOutcomesList, setLearningOutcomesList] = useState<LearningOutcome[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editClassId, setEditClassId] = useState<string | null>(null);
  const [newLearningOutcomeId, setNewLearningOutcomeId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newClass, setNewClass] = useState({
    group_id: '',
    learning_outcome_id: '',
    day: 'monday',
    pair_number: 1,
    type: 'theoretical',
    week: 1,
    semester: 3
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = selectedGroup
            ? { group_id: selectedGroup, semester, week }
            : { semester, week };
        const [scheduleResponse, statsResponse, loResponse, usersResponse] = await Promise.all([
          schedule.getSchedule(params),
          teacherStats.getStats(),
          learningOutcomes.getLearningOutcomes(),
          users.getUsers({ role: 'student' }), // Загружаем только студентов
        ]);

        const scheduleData = scheduleResponse.data.schedule || {};
        setGroups(scheduleResponse.data.groups || []);
        if (!selectedGroup && scheduleResponse.data.groups.length > 0) {
          setSelectedGroup(scheduleResponse.data.groups[0].id);
        }

        // Преобразуем расписание в плоский список занятий
        const classList: Class[] = [];
        Object.entries(scheduleData).forEach(([day, pairs]) => {
          Object.entries(pairs).forEach(([pair_number, event]: [string, any]) => {
            if (event.teacher_name === user?.name) {
              classList.push({
                id: event.id,
                discipline_name: event.discipline_name,
                teacher_name: event.teacher_name,
                module_index: event.module_index,
                type: event.type,
                pair_number,
                day,
              });
            }
          });
        });
        setClasses(classList);
        setStats(statsResponse.data);
        setLearningOutcomesList(loResponse.data);
        setStudents(usersResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.conflicts?.join('; ') || 'Ошибка загрузки данных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, selectedGroup, semester, week]);

  const handleEditClass = (classId: string) => {
    setEditClassId(classId);
    setIsEditing(true);
  };

  const submitEdit = async () => {
    if (editClassId && newLearningOutcomeId) {
      try {
        await schedule.updateSchedule(editClassId, {
          learning_outcome_id: newLearningOutcomeId,
        });
        const response = await schedule.getSchedule({
          group_id: selectedGroup,
          semester,
          week,
        });
        const scheduleData = response.data.schedule || {};
        const classList: Class[] = [];
        Object.entries(scheduleData).forEach(([day, pairs]) => {
          Object.entries(pairs).forEach(([pair_number, event]: [string, any]) => {
            if (event.teacher_name === user?.name) {
              classList.push({
                id: event.id,
                discipline_name: event.discipline_name,
                teacher_name: event.teacher_name,
                module_index: event.module_index,
                type: event.type,
                pair_number,
                day,
              });
            }
          });
        });
        setClasses(classList);
        setIsEditing(false);
        setNewLearningOutcomeId('');
      } catch (err: any) {
        setError(err.response?.data?.conflicts?.join('; ') || 'Ошибка обновления занятия');
      }
    }
  };

  const handleCreateClass = async () => {
    try {
      await schedule.createSchedule({
        ...newClass,
        group_id: selectedGroup || groups[0]?.id,
        week,
        semester,
      });
      const response = await schedule.getSchedule({
        group_id: selectedGroup,
        semester,
        week,
      });
      const scheduleData = response.data.schedule || {};
      const classList: Class[] = [];
      Object.entries(scheduleData).forEach(([day, pairs]) => {
        Object.entries(pairs).forEach(([pair_number, event]: [string, any]) => {
          if (event.teacher_name === user?.name) {
            classList.push({
              id: event.id,
              discipline_name: event.discipline_name,
              teacher_name: event.teacher_name,
              module_index: event.module_index,
              type: event.type,
              pair_number,
              day,
            });
          }
        });
      });
      setClasses(classList);
      setIsCreating(false);
      setNewClass({
        group_id: '',
        learning_outcome_id: '',
        day: 'monday',
        pair_number: 1,
        type: 'theoretical',
        week: 1,
        semester: 3
      });
    } catch (err: any) {
      setError(err.response?.data?.conflicts?.join('; ') || 'Ошибка создания занятия');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
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

  const todayClasses = classes.filter(
      (c) => c.day === new Date().toLocaleString('ru-RU', { weekday: 'long' }).toLowerCase()
  );

  return (
      <SidebarLayout
          links={[
            { to: '/teacher-dashboard', label: 'Дашборд', icon: <Calendar className="h-5 w-5" /> },
            { to: '/schedule', label: 'Расписание', icon: <CalendarDays className="h-5 w-5" /> },
            { to: '/classes', label: 'Мои занятия', icon: <BookOpen className="h-5 w-5" /> },
            { to: '/students', label: 'Студенты', icon: <Users className="h-5 w-5" /> },
            { to: '/profile', label: 'Профиль', icon: <User className="h-5 w-5" /> },
            { to: '/notifications', label: 'Уведомления', icon: <Bell className="h-5 w-5" /> },
          ]}
          title="Панель преподавателя"
          userRole="Преподаватель"
          userName={user?.name || 'Др. Джейн Смит'}
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
              title="Всего занятий"
              value={stats.totalClasses}
              icon={<BookOpen className="h-6 w-6" />}
              trend={{ value: 8, isPositive: true }}
          />
          <StatCard
              title="Занятий сегодня"
              value={todayClasses.length}
              icon={<Calendar className="h-6 w-6" />}
          />
          <StatCard
              title="Студентов"
              value={students.length}
              icon={<Users className="h-6 w-6" />}
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
              className="form-input"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Выберите группу</option>
            {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
            ))}
          </select>
          <select
              className="form-input"
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((s) => (
                <option key={s} value={s}>
                  Семестр {s}
                </option>
            ))}
          </select>
          <div className="flex space-x-2">
            <button
                className="btn btn-secondary flex items-center gap-2"
                onClick={() => setWeek((prev) => Math.max(1, prev - 1))}
            >
              <ArrowLeft className="h-4 w-4" />
              Предыдущая неделя
            </button>
            <button
                className="btn btn-secondary flex items-center gap-2"
                onClick={() => setWeek((prev) => prev + 1)}
            >
              Следующая неделя
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <button
              onClick={() => setIsCreating(true)}
              className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" /> Добавить новое занятие
          </button>
        </div>

        {/* Today's Classes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Занятия сегодня</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {todayClasses.map((classItem) => (
                <div
                    key={classItem.id}
                    className="card bg-primary/5 border-l-4 border-l-primary"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{classItem.discipline_name}</h3>
                      <p className="text-gray-600">{classItem.module_index}</p>
                      <div className="flex items-center text-gray-500 mt-2">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{classItem.type}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-primary mb-2">
                        <Clock className="h-5 w-5 mr-1" />
                        <span>Пара {classItem.pair_number}</span>
                      </div>
                      <button
                          className="text-gray-500 hover:text-primary"
                          onClick={() => handleEditClass(classItem.id)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* All Classes */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Мои занятия</h2>
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              Посмотреть все
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="table-header">Занятие</th>
                <th className="table-header">День</th>
                <th className="table-header">Пара</th>
                <th className="table-header">Модуль</th>
                <th className="table-header">Тип</th>
                <th className="table-header">Действия</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {classes.map((classItem) => (
                  <tr key={classItem.id}>
                    <td className="table-cell font-medium">{classItem.discipline_name}</td>
                    <td className="table-cell">
                      {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'][
                          ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].indexOf(classItem.day)
                          ] || classItem.day}
                    </td>
                    <td className="table-cell">{classItem.pair_number}</td>
                    <td className="table-cell">{classItem.module_index}</td>
                    <td className="table-cell">{classItem.type}</td>
                    <td className="table-cell">
                      <button
                          className="text-gray-500 hover:text-primary mr-2"
                          onClick={() => handleEditClass(classItem.id)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Students */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Мои студенты</h2>
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              Посмотреть все
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="table-header">Имя</th>
                <th className="table-header">Email</th>
                <th className="table-header">Роль</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                  <tr key={student.id}>
                    <td className="table-cell font-medium">{student.name}</td>
                    <td className="table-cell">{student.email}</td>
                    <td className="table-cell">{student.role}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Edit Modal */}
        <Modal
            isOpen={isEditing}
            onRequestClose={() => setIsEditing(false)}
            className="modal"
            overlayClassName="modal-overlay"
        >
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto mt-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Редактировать занятие</h2>
              <button onClick={() => setIsEditing(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Дисциплина</label>
              <select
                  className="form-input w-full"
                  value={newLearningOutcomeId}
                  onChange={(e) => setNewLearningOutcomeId(e.target.value)}
              >
                <option value="">Выберите дисциплину</option>
                {learningOutcomesList.map((lo) => (
                    <option key={lo.id} value={lo.id}>
                      {lo.discipline_name} ({lo.module.index})
                    </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsEditing(false)}
              >
                Отмена
              </button>
              <button className="btn btn-primary" onClick={submitEdit}>
                Сохранить
              </button>
            </div>
          </div>
        </Modal>

        {/* Create Modal */}
        <Modal
            isOpen={isCreating}
            onRequestClose={() => setIsCreating(false)}
            className="modal"
            overlayClassName="modal-overlay"
        >
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto mt-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Добавить занятие</h2>
              <button onClick={() => setIsCreating(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Группа</label>
              <select
                  className="form-input w-full"
                  value={newClass.group_id}
                  onChange={(e) => setNewClass({ ...newClass, group_id: e.target.value })}
              >
                <option value="">Выберите группу</option>
                {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Дисциплина</label>
              <select
                  className="form-input w-full"
                  value={newClass.learning_outcome_id}
                  onChange={(e) =>
                      setNewClass({ ...newClass, learning_outcome_id: e.target.value })
                  }
              >
                <option value="">Выберите дисциплину</option>
                {learningOutcomesList.map((lo) => (
                    <option key={lo.id} value={lo.id}>
                      {lo.discipline_name} ({lo.module.index})
                    </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">День</label>
              <select
                  className="form-input w-full"
                  value={newClass.day}
                  onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
              >
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day, idx) => (
                    <option key={day} value={day}>
                      {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'][idx]}
                    </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Пара</label>
              <select
                  className="form-input w-full"
                  value={newClass.pair_number}
                  onChange={(e) =>
                      setNewClass({ ...newClass, pair_number: Number(e.target.value) })
                  }
              >
                {[1, 2, 3, 4, 5, 6, 7].map((pair) => (
                    <option key={pair} value={pair}>
                      Пара {pair}
                    </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Тип</label>
              <select
                  className="form-input w-full"
                  value={newClass.type}
                  onChange={(e) => setNewClass({ ...newClass, type: e.target.value })}
              >
                <option value="theoretical">Теоретическая</option>
                <option value="practical">Практическая</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsCreating(false)}
              >
                Отмена
              </button>
              <button className="btn btn-primary" onClick={handleCreateClass}>
                Создать
              </button>
            </div>
          </div>
        </Modal>
      </SidebarLayout>
  );
};

export default TeacherDashboard;