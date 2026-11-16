import React, { useState } from 'react';
import { registerUser } from '../services/api';

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await registerUser({ email, password });
      setSuccessMsg('Registration successful! Redirecting to login...');
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: '#171717', color: '#fff', border: '1px solid #262626', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: '#a3a3a3', fontSize: '14px', marginBottom: '24px' }}>Get started with your expense tracking journey</p>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
        {successMsg && <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', padding: '10px', borderRadius: '6px', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>{successMsg}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#a3a3a3', fontWeight: 500 }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', fontSize: '14px', background: '#262626', border: '1px solid #404040', color: '#fff', borderRadius: '8px', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#a3a3a3', fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', fontSize: '14px', background: '#262626', border: '1px solid #404040', color: '#fff', borderRadius: '8px', outline: 'none' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ marginTop: '8px', padding: '12px', fontSize: '15px', background: loading ? '#374151' : '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#a3a3a3' }}>
          Already have an account?{' '}
          <span onClick={onSwitchToLogin} style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: 500 }}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
