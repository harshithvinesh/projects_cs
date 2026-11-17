import React, { useState } from 'react';
import Navigation4 from './Navigation4';
import Bento9 from './Bento9';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Cricket Equipment Kit', amount: 120.00, category: 'Sports', date: '2026-11-16' },
    { id: 2, title: 'Cloud Server Hosting', amount: 15.50, category: 'DevOps', date: '2026-11-15' },
    { id: 3, title: 'Coffee & Snacks', amount: 6.20, category: 'Food', date: '2026-11-14' },
  ]);
  
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Sports');

  const totalSpent = expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;

    const expense = {
      id: Date.now(),
      title: newTitle,
      amount: parseFloat(newAmount),
      category: newCategory,
      date: new Date().toISOString().split('T')[0],
    };

    setExpenses([expense, ...expenses]);
    setNewTitle('');
    setNewAmount('');
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  return (
    <div className="app-layout">
      {/* Navigation 4 Sidebar */}
      <Navigation4 activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      <main className="main-content">
        {/* HERO HEADER */}
        <header className="dashboard-hero">
          <div>
            <h1 className="hero-title">Financial Command Center</h1>
            <p className="hero-subtitle">Welcome back, {user?.email || 'Harshith'}. Here is your real-time overview.</p>
          </div>
          <div className="user-badge">
            <span className="status-dot"></span> Active Workspace
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-stack">
            {/* Bento 9 Histogram Card */}
            <Bento9 expenses={expenses} />

            <div className="dashboard-grid">
              {/* Profile Card */}
              <section className="profile-card">
                <div className="profile-avatar">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'H'}
                </div>
                <h3>{user?.email || 'harshithvinesh@gmail.com'}</h3>
                <span className="badge">Student Developer</span>
                
                <div className="stats-box">
                  <div className="stat-item">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value">${totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Transactions</span>
                    <span className="stat-value">{expenses.length}</span>
                  </div>
                </div>
              </section>

              {/* Expense Form & List */}
              <section className="expense-section">
                <form onSubmit={handleAddExpense} className="expense-form">
                  <input 
                    type="text" 
                    placeholder="Expense title (e.g. Batting Gloves)" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="expense-input"
                  />
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="Amount ($)" 
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="expense-input"
                  />
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="expense-select"
                  >
                    <option value="Sports">Sports</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Food">Food</option>
                    <option value="General">General</option>
                  </select>
                  <button type="submit" className="add-btn">Add Expense</button>
                </form>

                <div className="expense-list-container">
                  <h3>Recent Transactions</h3>
                  {expenses.length === 0 ? (
                    <p className="empty-state">No expenses logged yet.</p>
                  ) : (
                    <ul className="expense-list">
                      {expenses.map((item) => (
                        <li key={item.id} className="expense-item">
                          <div className="expense-info">
                            <span className="expense-title">{item.title}</span>
                            <span className="expense-meta">{item.category} • {item.date}</span>
                          </div>
                          <div className="expense-right">
                            <span className="expense-amount">-${item.amount.toFixed(2)}</span>
                            <button onClick={() => handleDelete(item.id)} className="delete-btn">×</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="tab-view">
            <h2>All Expenses Management</h2>
            <p style={{color: '#94a3b8'}}>Manage and categorize all your logged expenses here.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="tab-view">
            <h2>Advanced Analytics & Velocity</h2>
            <p style={{color: '#94a3b8'}}>Detailed breakdown of sports and development expenditure.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-view">
            <h2>Workspace Settings</h2>
            <p style={{color: '#94a3b8'}}>Configure Docker, MongoDB connection, and API credentials.</p>
          </div>
        )}
      </main>
    </div>
  );
}
