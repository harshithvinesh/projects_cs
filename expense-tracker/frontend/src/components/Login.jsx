import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
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
      if (isRegistering) {
        await registerUser({ email, password });
        setSuccessMsg('Registration successful! You can now log in.');
        setIsRegistering(false);
        setPassword('');
      } else {
        const response = await loginUser({ email, password });
        const token = response.data.token || response.data.data?.token;
        
        if (token) {
          localStorage.setItem('token', token);
          onLoginSuccess();
        } else {
          setError('Token not found in response');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || (isRegistering ? 'Registration failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: '#171717', color: '#fff', border: '1px solid #262626', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p style={{ textAlign: 'center', color: '#a3a3a3', fontSize: '14px', marginBottom: '24px' }}>
          {isRegistering ? 'Sign up to start tracking your expenses' : 'Enter your credentials to access your dashboard'}
        </p>
        
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
            {loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#a3a3a3' }}>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => { setIsRegistering(!isRegistering); setError(''); setSuccessMsg(''); }}
            style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: 500 }}
          >
            {isRegistering ? 'Sign in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}
