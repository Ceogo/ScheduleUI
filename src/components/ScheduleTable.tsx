import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import api from '../api';

interface Event {
  id: string;
  module_index: string;
  discipline_name: string;
  teacher_name: string;
  type: string;
}

interface Schedule {
  [day: string]: {
    [pair: string]: Event;
  };
}

interface Group {
  id: string;
  name: string;
}

interface ScheduleTableProps {
  currentWeek: string;
}

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const ScheduleTable: React.FC<ScheduleTableProps> = ({ currentWeek }) => {
  const [view, setView] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState('Понедельник');
  const [schedule, setSchedule] = useState<Schedule>({});
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [semester, setSemester] = useState(3);
  const [week, setWeek] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const params = selectedGroup
            ? { group_id: selectedGroup, semester, week }
            : { semester, week };
        const response = await api.schedule.getSchedule(params);
        setSchedule(response.data.schedule || {});
        setGroups(response.data.groups || []);
        if (!selectedGroup && response.data.groups.length > 0) {
          setSelectedGroup(response.data.groups[0].id);
        }
      } catch (err) {
        setError('Ошибка загрузки расписания');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [selectedGroup, semester, week]);

  const handlePreviousWeek = () => setWeek((prev) => Math.max(1, prev - 1));
  const handleNextWeek = () => setWeek((prev) => prev + 1);

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  // Преобразуем расписание в слоты по времени
  const timeSlots = Array.from({ length: 7 }, (_, i) => i + 1).map((pair) => ({
    time: `Пара ${pair}`,
    events: dayKeys.reduce((acc, day, idx) => {
      acc[days[idx]] = schedule[day]?.[pair] ? [schedule[day][pair]] : [];
      return acc;
    }, {} as { [day: string]: Event[] }),
  }));

  return (
      <div className="card overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-semibold mb-4 sm:mb-0">Расписание: Неделя {week}</h2>
          <div className="flex flex-col sm:flex-row items-center space-x-4">
            <select
                className="form-input mb-2 sm:mb-0"
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
                className="form-input mb-2 sm:mb-0"
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
                  onClick={handlePreviousWeek}
              >
                <ArrowLeft className="h-4 w-4" />
                Предыдущая неделя
              </button>
              <button
                  className="btn btn-secondary flex items-center gap-2"
                  onClick={handleNextWeek}
              >
                Следующая неделя
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                  className={`px-4 py-2 text-sm ${
                      view === 'week' ? 'bg-primary text-white' : 'bg-white text-gray-600'
                  }`}
                  onClick={() => setView('week')}
              >
                Неделя
              </button>
              <button
                  className={`px-4 py-2 text-sm ${
                      view === 'day' ? 'bg-primary text-white' : 'bg-white text-gray-600'
                  }`}
                  onClick={() => setView('day')}
              >
                День
              </button>
            </div>
          </div>
        </div>

        {/* Day selector for mobile */}
        <div className="md:hidden mb-4">
          <select
              className="form-input w-full"
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(e.target.value);
                setView('day');
              }}
          >
            {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
            ))}
          </select>
        </div>

        {/* Week View - For tablet and desktop */}
        {view === 'week' && (
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                  <th className="table-header w-24"></th>
                  {days.map((day) => (
                      <th key={day} className="table-header">
                        {day}
                      </th>
                  ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {timeSlots.map((slot, idx) => (
                    <tr key={idx}>
                      <td className="table-cell font-medium text-gray-500">{slot.time}</td>
                      {days.map((day) => (
                          <td key={day} className="schedule-cell">
                            {slot.events[day]?.map((event) => (
                                <div key={event.id} className="schedule-event">
                                  <div className="font-medium">{event.discipline_name}</div>
                                  <div className="text-xs opacity-75">{event.teacher_name}</div>
                                  <div className="text-xs">{event.module_index}</div>
                                </div>
                            ))}
                          </td>
                      ))}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}

        {/* Day View - For mobile and tablet when selected */}
        {view === 'day' && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg md:hidden">{selectedDay}</h3>
              {timeSlots.map((slot, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-600 text-sm">
                      {slot.time}
                    </div>
                    <div className="p-4 space-y-3">
                      {slot.events[selectedDay]?.length > 0 ? (
                          slot.events[selectedDay].map((event) => (
                              <div key={event.id} className="schedule-event">
                                <div className="font-medium">{event.discipline_name}</div>
                                <div className="text-xs opacity-75">{event.teacher_name}</div>
                                <div className="text-xs">{event.module_index}</div>
                              </div>
                          ))
                      ) : (
                          <div className="text-gray-400 flex items-center justify-center py-4">
                            <Calendar className="h-5 w-5 mr-2 opacity-60" />
                            <span>Нет запланированных занятий</span>
                          </div>
                      )}
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default ScheduleTable;