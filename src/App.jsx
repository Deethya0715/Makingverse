import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 

import PublicDisplay from './components/PublicDisplay'; 
import Navbar from './components/Navbar'; 
import './App.css'; 

export default function App() {
  return (
    <Router>
      <div className="app-root min-h-screen bg-gray-50">       
        <div className="site-wrap mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
            <Routes>
              <Route path="/" element={<PublicDisplay />} />
              <Route path="*" element={<h1 className="text-center p-20 text-3xl">404: Page Not Found</h1>} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}