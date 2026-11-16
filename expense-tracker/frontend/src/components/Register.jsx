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
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', background: '#1e1e1e', color: '#fff', border: '1px solid #333', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
      {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}
      {successMsg && <p style={{ color: '#28a745', textAlign: 'center' }}>{successMsg}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', fontSize: '16px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px', fontSize: '16px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
        <button type="submit" disabled={loading} style={{ padding: '10px', fontSize: '16px', background: loading ? '#555' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} style={{ color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}>
          Login here
        </span>
      </p>
    </div>
  );
}
