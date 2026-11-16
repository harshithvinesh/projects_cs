import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'

  // Dashboard state for expenses
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries', amount: 45.50, category: 'Food', date: '2026-11-15' },
    { id: 2, title: 'Gasoline', amount: 30.00, category: 'Transport', date: '2026-11-16' },
  ]);
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [filterCategory, setFilterCategory] = useState('All');

  // Add expense handler
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
  };

  // Delete expense handler
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  // Filtered expenses
  const filteredExpenses = filterCategory === 'All' 
    ? expenses 
    : expenses.filter(item => item.category === filterCategory);

  // Calculate total spending
  const totalSpent = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

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
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', background: '#121212', color: '#fff', borderRadius: '12px', fontFamily: 'sans-serif', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>💰 Expense Tracker Dashboard</h1>
        <button 
          onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }}
          style={{ padding: '8px 16px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      {/* Summary Card */}
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
        <div>
          <p style={{ margin: '0 0 5px 0', color: '#aaa', fontSize: '14px' }}>Total Spent ({filterCategory})</p>
          <h2 style={{ margin: 0, color: '#28a745', fontSize: '28px' }}>${totalSpent.toFixed(2)}</h2>
        </div>
        <div>
          <label style={{ marginRight: '10px', fontSize: '14px', color: '#aaa' }}>Filter Category:</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: '8px', background: '#2a2a2a', color: '#fff', border: '1px solid #444', borderRadius: '6px' }}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense} style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginBottom: '25px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '15px', alignItems: 'end', border: '1px solid #333' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Description</label>
          <input 
            type="text" 
            placeholder="e.g., Coffee" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Amount ($)</label>
          <input 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', background: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aaa' }}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#2a2a2a', color: '#fff', border: '1px solid #444', borderRadius: '6px', boxSizing: 'border-box' }}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button 
          type="submit" 
          style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Add Expense
        </button>
      </form>

      {/* Expense List */}
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
        <h3 style={{ marginTop: '0', marginBottom: '15px', fontSize: '18px' }}>Recent Transactions</h3>
        {filteredExpenses.length === 0 ? (
          <p style={{ color: '#777', textAlign: 'center', margin: '20px 0' }}>No expenses found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredExpenses.map((item) => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#252525', padding: '12px 15px', borderRadius: '6px', border: '1px solid #333' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.title}</span>
                  <div style={{ fontSize: '12px', color: '#aaa', marginTop: '3px' }}>
                    <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px', marginRight: '8px' }}>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '16px' }}>-${item.amount.toFixed(2)}</span>
                  <button 
                    onClick={() => handleDeleteExpense(item.id)}
                    style={{ background: 'transparent', color: '#ff4d4d', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
