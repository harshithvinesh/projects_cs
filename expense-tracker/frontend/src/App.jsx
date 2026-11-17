import React, { useState } from "react";
import Welcome from "./components/Welcome";
import Login from './components/Login';
import DashBoard from './components/Dashboard';
import Register from "./components/Register";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('login');

  if (showWelcome) {
    return <Welcome onGetStarted={() => setShowWelcome(false)} />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        {currentView === 'login' ? (
          <Login
            onLoginSuccess={() => setIsAuthenticated(true)}
            onSwitchToRegister={() => setCurrentView('register')}
          />
        ) : (
          <Register
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </div>
    );
  }

  return (
    <DashBoard 
      user={{ email: localStorage.getItem('userEmail') || 'harshithvinesh@gmail.com' }}
      onLogout={() => { 
        localStorage.removeItem('token'); 
        setIsAuthenticated(false); 
      }} 
    />
  );
}
