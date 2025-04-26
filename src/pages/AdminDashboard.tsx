import React from 'react';
import { 
  CalendarDays, 
  Settings, 
  User, 
  Bell, 
  Calendar, 
  Users,
  LineChart,
  Plus,
  FilePlus,
  BarChart3,
  PieChart,
  TrendingUp 
} from 'lucide-react';
import SidebarLayout from '../components/SidebarLayout';
import StatCard from '../components/StatCard';

const statsData = [
  { id: 1, month: 'Jan', value: 65 },
  { id: 2, month: 'Feb', value: 59 },
  { id: 3, month: 'Mar', value: 80 },
  { id: 4, month: 'Apr', value: 81 },
  { id: 5, month: 'May', value: 56 },
  { id: 6, month: 'Jun', value: 55 },
  { id: 7, month: 'Jul', value: 40 },
  { id: 8, month: 'Aug', value: 70 },
  { id: 9, month: 'Sep', value: 90 },
  { id: 10, month: 'Oct', value: 110 },
  { id: 11, month: 'Nov', value: 90 },
  { id: 12, month: 'Dec', value: 70 },
];

// Calculate max value for scaling
const maxValue = Math.max(...statsData.map(item => item.value));

const AdminDashboard: React.FC = () => {
  const sidebarLinks = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: <Calendar className="h-5 w-5" /> },
    { to: '/schedules', label: 'Schedules', icon: <CalendarDays className="h-5 w-5" /> },
    { to: '/users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { to: '/analytics', label: 'Analytics', icon: <LineChart className="h-5 w-5" /> },
    { to: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { to: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { to: '/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
  ];

  return (
    <SidebarLayout
      links={sidebarLinks}
      title="Admin Dashboard"
      userRole="Administrator"
      userName="Robert Williams"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="1,248"
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Students"
          value="986"
          icon={<User className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Teachers"
          value="124"
          icon={<User className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Classes Today"
          value="68"
          icon={<Calendar className="h-6 w-6" />}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" /> Add New User
        </button>
        <button className="btn btn-primary flex items-center gap-2">
          <FilePlus className="h-5 w-5" /> Create Schedule
        </button>
        <button className="btn btn-secondary flex items-center gap-2">
          <LineChart className="h-5 w-5" /> View Detailed Reports
        </button>
      </div>
      
      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">User Growth</h3>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12%</span>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <div className="flex h-full items-end">
              {statsData.map((item) => (
                <div key={item.id} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-primary/90 hover:bg-primary w-full mx-1 rounded-t-sm transition-all" 
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* User Distribution */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">User Distribution</h3>
            <div className="text-gray-500">
              <PieChart className="h-5 w-5" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-primary h-4 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="ml-4 text-sm font-medium">Students (65%)</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-accent h-4 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="ml-4 text-sm font-medium">Teachers (25%)</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '8%' }}></div>
              </div>
              <span className="ml-4 text-sm font-medium">Staff (8%)</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-red-500 h-4 rounded-full" style={{ width: '2%' }}></div>
              </div>
              <span className="ml-4 text-sm font-medium">Administrators (2%)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Users */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Role</th>
                <th className="table-header">Status</th>
                <th className="table-header">Joined</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="table-cell font-medium">John Doe</td>
                <td className="table-cell">john.doe@example.com</td>
                <td className="table-cell">Student</td>
                <td className="table-cell">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="table-cell">Oct 15, 2023</td>
                <td className="table-cell">
                  <button className="text-gray-500 hover:text-primary mr-2">
                    <User className="h-5 w-5" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="table-cell font-medium">Jane Smith</td>
                <td className="table-cell">jane.smith@example.com</td>
                <td className="table-cell">Teacher</td>
                <td className="table-cell">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="table-cell">Oct 12, 2023</td>
                <td className="table-cell">
                  <button className="text-gray-500 hover:text-primary mr-2">
                    <User className="h-5 w-5" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="table-cell font-medium">Michael Johnson</td>
                <td className="table-cell">michael.j@example.com</td>
                <td className="table-cell">Student</td>
                <td className="table-cell">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="table-cell">Oct 10, 2023</td>
                <td className="table-cell">
                  <button className="text-gray-500 hover:text-primary mr-2">
                    <User className="h-5 w-5" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="table-cell font-medium">Emily Davis</td>
                <td className="table-cell">emily.d@example.com</td>
                <td className="table-cell">Teacher</td>
                <td className="table-cell">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="table-cell">Oct 8, 2023</td>
                <td className="table-cell">
                  <button className="text-gray-500 hover:text-primary mr-2">
                    <User className="h-5 w-5" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="table-cell font-medium">Robert Williams</td>
                <td className="table-cell">robert.w@example.com</td>
                <td className="table-cell">Admin</td>
                <td className="table-cell">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="table-cell">Oct 5, 2023</td>
                <td className="table-cell">
                  <button className="text-gray-500 hover:text-primary mr-2">
                    <User className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </SidebarLayout>
  );
};

export default AdminDashboard;