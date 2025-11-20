// src/components/Login.jsx

import React, { useState } from 'react';
import { auth } from '../services/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Attempt to sign in the collaborator
      await signInWithEmailAndPassword(auth, email, password);
      // Success will trigger App.jsx's onAuthStateChanged listener and redirect
    } catch (err) {
      console.error("Login Error:", err);
      // Display a user-friendly error message
      setError("Login failed. Please check your collaborator email and password.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl border border-indigo-200 mt-10 transition-all duration-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
        <span role="img" aria-label="lock" className="mr-2">🔒</span> Access CMS
      </h2>
      <p className="text-center text-gray-600 mb-8">Sign in with your collaborator account to manage papers and settings.</p>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Collaborator Email</label>
          <input 
            type="email" 
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-colors"
            placeholder="collab@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-colors"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
        
        {error && (
          <p className="text-red-600 text-sm mt-4 text-center p-2 bg-red-50 border border-red-300 rounded-lg">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;