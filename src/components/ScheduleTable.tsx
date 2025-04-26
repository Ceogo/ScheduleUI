import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  location: string;
  time: string;
}

interface TimeSlot {
  time: string;
  events: {
    [day: string]: Event[];
  };
}

interface ScheduleTableProps {
  timeSlots: TimeSlot[];
  currentWeek: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ScheduleTable: React.FC<ScheduleTableProps> = ({ timeSlots, currentWeek }) => {
  const [view, setView] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState('Monday');

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-4 sm:mb-0">Schedule: {currentWeek}</h2>
        
        <div className="flex items-center space-x-4">
          <button className="btn btn-secondary flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous Week
          </button>
          
          <button className="btn btn-secondary flex items-center gap-2">
            Next Week
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
            <button 
              className={`px-4 py-2 text-sm ${view === 'week' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={`px-4 py-2 text-sm ${view === 'day' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Day selector for mobile */}
      <div className="md:hidden mb-4">
        <select 
          className="form-input"
          value={selectedDay}
          onChange={(e) => {
            setSelectedDay(e.target.value);
            setView('day');
          }}
        >
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
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
                {days.map(day => (
                  <th key={day} className="table-header">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {timeSlots.map((slot, idx) => (
                <tr key={idx}>
                  <td className="table-cell font-medium text-gray-500">
                    {slot.time}
                  </td>
                  {days.map(day => (
                    <td key={day} className="schedule-cell">
                      {slot.events[day]?.map(event => (
                        <div key={event.id} className="schedule-event">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs opacity-75">{event.location}</div>
                          <div className="text-xs">{event.time}</div>
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
      {(view === 'day' || window.innerWidth < 768) && (
        <div className="space-y-4">
          <h3 className="font-medium text-lg md:hidden">{selectedDay}</h3>
          {timeSlots.map((slot, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 font-medium text-gray-600 text-sm">
                {slot.time}
              </div>
              <div className="p-4 space-y-3">
                {slot.events[selectedDay]?.length > 0 ? (
                  slot.events[selectedDay].map(event => (
                    <div key={event.id} className="schedule-event">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-75">{event.location}</div>
                      <div className="text-xs">{event.time}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 flex items-center justify-center py-4">
                    <Calendar className="h-5 w-5 mr-2 opacity-60" />
                    <span>No events scheduled</span>
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