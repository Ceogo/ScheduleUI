import React from 'react';
import { 
  CalendarDays, 
  BookOpen, 
  User, 
  Bell, 
  Calendar, 
  Edit,
  Clock,
  Users,
  Plus
} from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import StatCard from '../components/StatCard';

// Sample data
const mockClasses = [
  { 
    id: '1', 
    title: 'Mathematics 101', 
    time: '8:00 - 9:30', 
    location: 'Room 101',
    students: 28,
    day: 'Monday'
  },
  { 
    id: '2', 
    title: 'Mathematics 201', 
    time: '11:30 - 13:00', 
    location: 'Room 101',
    students: 24,
    day: 'Thursday'
  },
  { 
    id: '3', 
    title: 'Mathematics for Physics', 
    time: '13:45 - 15:15', 
    location: 'Room 102',
    students: 18,
    day: 'Tuesday'
  },
  { 
    id: '4', 
    title: 'Advanced Calculus', 
    time: '9:45 - 11:15', 
    location: 'Room 103',
    students: 15,
    day: 'Wednesday'
  },
];

const TeacherDashboard: React.FC = () => {
  const sidebarLinks = [
    { to: '/teacher-dashboard', label: 'Dashboard', icon: <Calendar className="h-5 w-5" /> },
    { to: '/schedule', label: 'Schedule', icon: <CalendarDays className="h-5 w-5" /> },
    { to: '/classes', label: 'My Classes', icon: <BookOpen className="h-5 w-5" /> },
    { to: '/students', label: 'Students', icon: <Users className="h-5 w-5" /> },
    { to: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { to: '/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
  ];

  return (
    <SidebarLayout
      links={sidebarLinks}
      title="Teacher Dashboard"
      userRole="Teacher"
      userName="Dr. Jane Smith"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Classes"
          value="12"
          icon={<BookOpen className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Students"
          value="186"
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Hours This Week"
          value="24"
          icon={<Clock className="h-6 w-6" />}
        />
        <StatCard
          title="Upcoming Exams"
          value="3"
          icon={<Calendar className="h-6 w-6" />}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" /> Add New Class
        </button>
        <button className="btn btn-secondary flex items-center gap-2">
          <Bell className="h-5 w-5" /> View Notifications
        </button>
      </div>
      
      {/* Today's Classes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-primary/5 border-l-4 border-l-primary">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Mathematics 101</h3>
                <p className="text-gray-600">Room 101</p>
                <div className="flex items-center text-gray-500 mt-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span>28 students</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-primary mb-2">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>8:00 - 9:30</span>
                </div>
                <button className="text-gray-500 hover:text-primary">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Mathematics 201</h3>
                <p className="text-gray-600">Room 101</p>
                <div className="flex items-center text-gray-500 mt-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span>24 students</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-primary mb-2">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>11:30 - 13:00</span>
                </div>
                <button className="text-gray-500 hover:text-primary">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Calendar Widget */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">October 2023</h2>
        <div className="card">
          <div className="grid grid-cols-7 gap-1">
            <div className="text-center text-gray-500 font-medium p-2">Sun</div>
            <div className="text-center text-gray-500 font-medium p-2">Mon</div>
            <div className="text-center text-gray-500 font-medium p-2">Tue</div>
            <div className="text-center text-gray-500 font-medium p-2">Wed</div>
            <div className="text-center text-gray-500 font-medium p-2">Thu</div>
            <div className="text-center text-gray-500 font-medium p-2">Fri</div>
            <div className="text-center text-gray-500 font-medium p-2">Sat</div>
            
            <div className="text-center text-gray-400 p-2">24</div>
            <div className="text-center text-gray-400 p-2">25</div>
            <div className="text-center text-gray-400 p-2">26</div>
            <div className="text-center text-gray-400 p-2">27</div>
            <div className="text-center text-gray-400 p-2">28</div>
            <div className="text-center text-gray-400 p-2">29</div>
            <div className="text-center text-gray-400 p-2">30</div>
            
            <div className="text-center p-2">1</div>
            <div className="text-center p-2">2</div>
            <div className="text-center p-2">3</div>
            <div className="text-center p-2">4</div>
            <div className="text-center p-2">5</div>
            <div className="text-center p-2">6</div>
            <div className="text-center p-2">7</div>
            
            <div className="text-center p-2">8</div>
            <div className="text-center bg-primary text-white rounded-full p-2">9</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">10</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">11</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">12</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">13</div>
            <div className="text-center p-2">14</div>
            
            <div className="text-center p-2">15</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">16</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">17</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">18</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">19</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">20</div>
            <div className="text-center p-2">21</div>
            
            <div className="text-center p-2">22</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">23</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">24</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">25</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">26</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">27</div>
            <div className="text-center p-2">28</div>
            
            <div className="text-center p-2">29</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">30</div>
            <div className="text-center p-2 bg-primary/10 text-primary rounded-lg">31</div>
            <div className="text-center text-gray-400 p-2">1</div>
            <div className="text-center text-gray-400 p-2">2</div>
            <div className="text-center text-gray-400 p-2">3</div>
            <div className="text-center text-gray-400 p-2">4</div>
          </div>
        </div>
      </section>
      
      {/* All Classes */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Classes</h2>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Class</th>
                <th className="table-header">Day</th>
                <th className="table-header">Time</th>
                <th className="table-header">Location</th>
                <th className="table-header">Students</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockClasses.map(classItem => (
                <tr key={classItem.id}>
                  <td className="table-cell font-medium">{classItem.title}</td>
                  <td className="table-cell">{classItem.day}</td>
                  <td className="table-cell">{classItem.time}</td>
                  <td className="table-cell">{classItem.location}</td>
                  <td className="table-cell">{classItem.students}</td>
                  <td className="table-cell">
                    <button className="text-gray-500 hover:text-primary mr-2">
                      <Edit className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SidebarLayout>
  );
};

export default TeacherDashboard;