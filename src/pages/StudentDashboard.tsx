import React from 'react';
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
  }
];

const mockAssignments = [
  { id: '1', title: 'Math Problem Set', dueDate: 'Oct 15, 2023', course: 'Mathematics', status: 'pending' },
  { id: '2', title: 'Physics Lab Report', dueDate: 'Oct 18, 2023', course: 'Physics', status: 'completed' },
  { id: '3', title: 'Literature Essay', dueDate: 'Oct 20, 2023', course: 'Literature', status: 'pending' },
  { id: '4', title: 'Chemistry Experiment', dueDate: 'Oct 22, 2023', course: 'Chemistry', status: 'pending' },
];

const StudentDashboard: React.FC = () => {
  const sidebarLinks = [
    { to: '/student-dashboard', label: 'Dashboard', icon: <Calendar className="h-5 w-5" /> },
    { to: '/schedule', label: 'Schedule', icon: <CalendarDays className="h-5 w-5" /> },
    { to: '/assignments', label: 'Assignments', icon: <FileText className="h-5 w-5" /> },
    { to: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { to: '/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
  ];

  return (
    <SidebarLayout
      links={sidebarLinks}
      title="Student Dashboard"
      userRole="Student"
      userName="Alex Johnson"
    >
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="btn btn-primary flex items-center gap-2">
          <Download className="h-5 w-5" /> Download Schedule
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
                <h3 className="font-medium text-lg">Mathematics</h3>
                <p className="text-gray-600">Room 101</p>
              </div>
              <div className="flex items-center text-primary">
                <Clock className="h-5 w-5 mr-1" />
                <span>8:00 - 9:30</span>
              </div>
            </div>
          </div>
          
          <div className="card bg-primary/5 border-l-4 border-l-primary">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">History</h3>
                <p className="text-gray-600">Room 201</p>
              </div>
              <div className="flex items-center text-primary">
                <Clock className="h-5 w-5 mr-1" />
                <span>9:45 - 11:15</span>
              </div>
            </div>
          </div>
          
          <div className="card bg-primary/5 border-l-4 border-l-primary">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Chemistry Lab</h3>
                <p className="text-gray-600">Lab 1</p>
              </div>
              <div className="flex items-center text-primary">
                <Clock className="h-5 w-5 mr-1" />
                <span>13:45 - 15:15</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Assignments */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Assignment</th>
                <th className="table-header">Course</th>
                <th className="table-header">Due Date</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAssignments.map(assignment => (
                <tr key={assignment.id}>
                  <td className="table-cell font-medium">{assignment.title}</td>
                  <td className="table-cell">{assignment.course}</td>
                  <td className="table-cell">{assignment.dueDate}</td>
                  <td className="table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      assignment.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assignment.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Weekly Schedule */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
        <ScheduleTable 
          timeSlots={mockTimeSlots}
          currentWeek="October 9 - October 13, 2023"
        />
      </section>
    </SidebarLayout>
  );
};

export default StudentDashboard;