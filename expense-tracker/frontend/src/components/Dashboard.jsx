import React, { useState } from 'react';
import Navigation4 from './Navigation4';
import Bento9 from './Bento9';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Calendar filter state
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-11-18');

  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Cricket Equipment Kit', amount: 120.00, category: 'Sports', date: '2026-11-16' },
    { id: 2, title: 'Cloud Server Hosting', amount: 15.50, category: 'DevOps', date: '2026-11-15' },
    { id: 3, title: 'Coffee & Snacks', amount: 6.20, category: 'Food', date: '2026-11-14' },
  ]);
  
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Sports');

  // Filter expenses based on selected calendar dates
  const filteredExpenses = expenses.filter(item => item.date >= startDate && item.date <= endDate);
  const totalSpent = filteredExpenses.reduce((acc, item) => acc + Number(item.amount), 0);

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
      <Navigation4 activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      <main className="main-content">
        <header className="dashboard-hero">
          <div>
            <h1 className="hero-title">Financial Command Center</h1>
            <p className="hero-subtitle">Welcome back, {user?.email || 'harshithvinesh@gmail.com'}.</p>
          </div>
          
          {/* Calendar Filter Picker */}
          <div className="calendar-filter-bar">
            <span>Filter:</span>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="date-input"
            />
            <span>to</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="date-input"
            />
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-stack">
            {/* Bento 9 Histogram reflecting filtered expenses */}
            <Bento9 expenses={filteredExpenses} totalSpent={totalSpent} />

            <div className="dashboard-grid-main">
              {/* Profile Card Fixed Layout */}
              <section className="profile-card-fixed">
                <div className="profile-avatar-large">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'H'}
                </div>
                <h3 className="profile-email">{user?.email || 'harshithvinesh@gmail.com'}</h3>
                <span className="badge">Student Developer</span>
                
                <div className="stats-box">
                  <div className="stat-item">
                    <span className="stat-label">Filtered Spent</span>
                    <span className="stat-value">${totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Transactions</span>
                    <span className="stat-value">{filteredExpenses.length}</span>
                  </div>
                </div>
              </section>

              {/* Expense Section */}
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
                  {filteredExpenses.length === 0 ? (
                    <p className="empty-state">No transactions found in this date range.</p>
                  ) : (
                    <ul className="expense-list">
                      {filteredExpenses.map((item) => (
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

        {activeTab === 'settings' && (
          <div className="tab-view">
            <h2>User Profile & PostgreSQL Settings</h2>
            <p style={{color: '#94a3b8', marginBottom: '20px'}}>Connected via PostgreSQL Single-User Auth & OAuth Providers.</p>
            <div style={{background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px'}}>
              <p><strong>Email:</strong> {user?.email || 'harshithvinesh@gmail.com'}</p>
              <p><strong>Auth Provider:</strong> Local JWT / Google OAuth</p>
              <p><strong>Database Driver:</strong> PostgreSQL (Prisma ORM)</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
