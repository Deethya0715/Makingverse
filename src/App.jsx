import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/DashboardClean';
import './App.css';

export default function App() {
  return (
    <div className="app-root">
      <div className="site-wrap mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}