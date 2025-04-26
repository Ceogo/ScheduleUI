import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Users, Lock, Layout } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white">
        <Header transparent={true} />
        
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Your Electronic Schedule Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Easily manage schedules for students, teachers, and administrators
            </p>
            <NavLink 
              to="/login" 
              className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg animate-fade-in" 
              style={{ animationDelay: '0.2s' }}
            >
              Get Started
            </NavLink>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Streamline Your Educational Scheduling
            </h2>
            <p className="text-xl text-gray-600">
              Our platform provides powerful tools to manage and optimize your academic schedules
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="h-12 w-12" />}
              title="View Schedules"
              description="Access your personalized schedule anytime, anywhere. Filter by day, week, or month."
            />
            <FeatureCard
              icon={<Layout className="h-12 w-12" />}
              title="Manage Classes"
              description="For teachers and admins: easily create, edit, and organize classes and events."
            />
            <FeatureCard
              icon={<Lock className="h-12 w-12" />}
              title="Secure Access"
              description="Role-based authentication ensures users only see what they need to see."
            />
            <FeatureCard
              icon={<Users className="h-12 w-12" />}
              title="Multiple Roles"
              description="Specialized interfaces for students, teachers, and administrators."
            />
            <FeatureCard
              icon={<Calendar className="h-12 w-12" />}
              title="Weekly Overview"
              description="Get a comprehensive view of your week to better plan your time."
            />
            <FeatureCard
              icon={<Layout className="h-12 w-12" />}
              title="Responsive Design"
              description="Access your schedule on any device - desktop, tablet, or mobile."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Optimize Your Educational Scheduling?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of educational institutions already using our platform to streamline their scheduling process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink 
                to="/login" 
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Get Started
              </NavLink>
              <NavLink 
                to="/schedule" 
                className="btn btn-secondary px-8 py-3 text-lg"
              >
                View Demo Schedule
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