import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import PublicDisplay from './components/PublicDisplay'; 
import PaperSubmissionForm from './components/PaperSubmissionForm'; // Import your form
import Navbar from './components/Navbar'; 
import './App.css'; 

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const SECRET_WORD = "test"; // Change this to your secret word

  // Check if they were already logged in on page refresh
  useEffect(() => {
    const savedAdmin = localStorage.getItem('is_admin_active');
    if (savedAdmin === 'true') setIsAdmin(true);
  }, []);

  const loginAdmin = (word) => {
    if (word === SECRET_WORD) {
      setIsAdmin(true);
      localStorage.setItem('is_admin_active', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('is_admin_active');
  };

  return (
    <Router>
      <div className="app-root min-h-screen bg-gray-50">       
        <div className="site-wrap mx-auto px-4 sm:px-6 lg:px-8">
            {/* Pass isAdmin to Navbar to show the button */}
            <Navbar isAdmin={isAdmin} onLogout={logoutAdmin} />
            
            <Routes>
              <Route path="/" element={<PublicDisplay isAdmin={isAdmin} onAdminLogin={loginAdmin} />} />
              
              {/* Only allow access to the form if isAdmin is true */}
              <Route 
                path="/admin-add-paper" 
                element={isAdmin ? <PaperSubmissionForm /> : <Navigate to="/" />} 
              />
              
              <Route path="*" element={<h1 className="text-center p-20 text-3xl">404: Page Not Found</h1>} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}