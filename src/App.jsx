import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/DashboardClean';
import './App.css';

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Dashboard />
    </div>
  );
}