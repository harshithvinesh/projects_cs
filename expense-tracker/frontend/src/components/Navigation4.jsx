import React, { useState } from 'react';
import './Navigation4.css';

export default function Navigation4({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Expenses', icon: '💳' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="side-dock">
      <div className="dock-brand">
        <span className="brand-icon">💎</span>
      </div>

      <nav className="dock-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`dock-item ${activeTab === item.id ? 'active' : ''}`}
            title={item.label}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-tooltip">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="dock-footer">
        <button onClick={onLogout} className="dock-item logout" title="Sign Out">
          <span className="dock-icon">🚪</span>
          <span className="dock-tooltip">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
