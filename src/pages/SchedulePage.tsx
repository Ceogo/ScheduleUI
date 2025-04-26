import React, { useState } from 'react';
import { CalendarDays, Users, ChevronDown, Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScheduleTable from '../components/ScheduleTable';

// Sample data
const mockTimeSlots = [
  {
    time: '8:00 - 9:30',
    events: {
      Monday: [
        { id: '1', title: 'Mathematics', location: 'Room 101', time: '8:00 - 9:30' }
      ],
      Tuesday: [
        { id: '2', title: 'Physics', location: 'Room 102', time: '8:00 - 9:30' }
      ],
      Wednesday: [
        { id: '3', title: 'Chemistry', location: 'Room 103', time: '8:00 - 9:30' }
      ],
      Thursday: [],
      Friday: [
        { id: '4', title: 'Biology', location: 'Room 104', time: '8:00 - 9:30' }
      ]
    }
  },
  {
    time: '9:45 - 11:15',
    events: {
      Monday: [
        { id: '5', title: 'History', location: 'Room 201', time: '9:45 - 11:15' }
      ],
      Tuesday: [],
      Wednesday: [
        { id: '6', title: 'Literature', location: 'Room 202', time: '9:45 - 11:15' }
      ],
      Thursday: [
        { id: '7', title: 'Computer Science', location: 'Room 303', time: '9:45 - 11:15' }
      ],
      Friday: [
        { id: '8', title: 'Art', location: 'Room 204', time: '9:45 - 11:15' }
      ]
    }
  },
  {
    time: '11:30 - 13:00',
    events: {
      Monday: [],
      Tuesday: [
        { id: '9', title: 'Physical Education', location: 'Gym', time: '11:30 - 13:00' }
      ],
      Wednesday: [
        { id: '10', title: 'Foreign Languages', location: 'Room 205', time: '11:30 - 13:00' }
      ],
      Thursday: [
        { id: '11', title: 'Mathematics', location: 'Room 101', time: '11:30 - 13:00' }
      ],
      Friday: []
    }
  },
  {
    time: '13:45 - 15:15',
    events: {
      Monday: [
        { id: '12', title: 'Chemistry Lab', location: 'Lab 1', time: '13:45 - 15:15' }
      ],
      Tuesday: [
        { id: '13', title: 'Physics Lab', location: 'Lab 2', time: '13:45 - 15:15' }
      ],
      Wednesday: [],
      Thursday: [
        { id: '14', title: 'Biology Lab', location: 'Lab 3', time: '13:45 - 15:15' }
      ],
      Friday: [
        { id: '15', title: 'Computer Science', location: 'Room 303', time: '13:45 - 15:15' }
      ]
    }
  }
];

const mockGroups = [
  { id: '1', name: 'Group A' },
  { id: '2', name: 'Group B' },
  { id: '3', name: 'Group C' },
];

const mockTeachers = [
  { id: '1', name: 'Dr. Smith' },
  { id: '2', name: 'Prof. Johnson' },
  { id: '3', name: 'Mrs. Williams' },
];

const SchedulePage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Schedule</h1>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="form-input pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    className="form-input pr-10 appearance-none"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <option value="">All Groups</option>
                    {mockGroups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="relative">
                  <select
                    className="form-input pr-10 appearance-none"
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                    <option value="">All Teachers</option>
                    {mockTeachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <button className="btn btn-secondary">
                  <Filter className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <ScheduleTable 
            timeSlots={mockTimeSlots} 
            currentWeek="October 9 - October 13, 2023"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SchedulePage;