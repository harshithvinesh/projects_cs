import React, { useState } from "react";
import Welcome from "./components/Welcome";
import Login from './components/Login'
import DashBoard from './components/Dashboard'
import Register from "./components/Register";
export default function App(){
  const [isLoggedIn,setIsLoggedIn]=useState(true)
  const [showWelcome,setShowWelcome]=useState(true)
  const [isAuthenticated,setIsAuthenticated]=useState(!!localStorage.getItem('token'))
  const [currentView,setCurrentView]=useState('login')

  if(showWelcome){
    return <Welcome onGetStarted={()=>setShowWelcome(false)}/>
  }
  if(!isAuthenticated){
    return(
      <div>
        {currentView==='login' ? (
          <Login
            onLoginSuccess={()=>setIsAuthenticated(true)}
            onSwitchToRegister={()=>setCurrentView('register')}
          />
        ):(
          <Register
            onSwitchToLogin={()=>setCurrentView('login')}
          />
        )}
      </div>
    )
  }
  return(
    <div style={{ padding: '40px', background: '#121212', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1> Expense Tracker Dashboard</h1>
      <p>Welcome! You are successfully logged in.</p>
      <button 
        onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }}
        style={{ padding: '10px 20px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  )

}