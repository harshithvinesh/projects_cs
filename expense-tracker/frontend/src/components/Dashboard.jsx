import React, { useState, useEffect } from 'react';
import Navigation4 from './Navigation4';
import EditProfileModal from './EditProfileModal';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState({
    name: user?.name || 'Harshith Vinesh Rao',
    email: user?.email || 'harshithvinesh@gmail.com',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500'
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (expensive first) or 'asc' (cheap first)

  // Financial & Item Datasets
  const [purchasedItems, setPurchasedItems] = useState([
    { id: 1, title: 'Cricket Equipment Kit', cost: 120.00, category: 'Sports', date: '2026-11-18', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300' },
    { id: 2, title: 'Cloud Server Hosting', cost: 45.50, category: 'DevOps', date: '2026-11-17', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300' },
    { id: 3, title: 'Batting Gloves & Grips', cost: 35.00, category: 'Sports', date: '2026-11-15', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300' },
    { id: 4, title: 'Mechanical Keyboard', cost: 89.99, category: 'Hardware', date: '2026-11-14', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300' },
  ]);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Metrics Calculations
  const totalExpenses = purchasedItems.reduce((acc, item) => acc + item.cost, 0);
  const totalProfits = 3450.00; // Simulated income/profit
  const totalClients = 12;
  const totalBoughtItems = purchasedItems.length;

  // Sorting filter for "Buying this week"
  const sortedItems = [...purchasedItems].sort((a, b) => {
    return sortOrder === 'desc' ? b.cost - a.cost : a.cost - b.cost;
  });

  const latestItem = purchasedItems[0];

  return (
    <div className="dashboard-root">
      {/* SIDE DOCK NAVIGATION */}
      <Navigation4 activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      {/* MAIN VIEW AREA */}
      <main className="dashboard-main">
        
        {/* HEADER SECTION */}
        <header className="dashboard-header">
          <h1 className="header-title">Channel Analytics</h1>
          <div className="header-actions">
            <button className="icon-btn" title="Notifications">🔔</button>
            <button className="icon-btn" title="Search">🔍</button>
            
            {/* User Profile Avatar (Clickable to Edit) */}
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="user-profile-btn"
            >
              <img 
                src={profile.avatar} 
                alt="Profile" 
                className="user-avatar-img" 
              />
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-grid-layout">
            
            {/* ROW 1: HERO BANNER & MONTHLY GRAPH / LATEST ITEM */}
            <div className="top-row-grid">
              
              {/* HERO BANNER */}
              <div className="glass-card hero-banner">
                <div className="hero-text-content">
                  <span className="hero-tag">Popular Solution</span>
                  <h2 className="hero-heading">Optimize Your Metrics</h2>
                  <button className="hero-cta-btn">Start Now</button>
                </div>
                <div className="hero-image-wrapper">
                  <img src={profile.avatar} alt="User Hero" className="hero-user-img" />
                </div>
              </div>

              {/* RIGHT COLUMN CARDS */}
              <div className="right-sidebar-stack">
                
                {/* MONTHLY LOSS + PROFIT + EXPENSES GRAPH CARD */}
                <div className="glass-card graph-card">
                  <div className="card-header-flex">
                    <span className="card-title-sm">Monthly Financial Velocity 💡</span>
                    <span className="live-badge">Active</span>
                  </div>
                  <div className="graph-stats-row">
                    <div className="mini-stat"><span className="dot profit"></span> Profit</div>
                    <div className="mini-stat"><span className="dot expense"></span> Expenses</div>
                    <div className="mini-stat"><span className="dot loss"></span> Loss</div>
                  </div>
                  <div className="mini-line-graph-container">
                    <svg className="graph-svg" viewBox="0 0 200 60">
                      <path d="M 0 45 Q 50 10, 100 30 T 200 15" fill="none" stroke="#3b82f6" strokeWidth="3" />
                      <path d="M 0 50 Q 50 25, 100 40 T 200 25" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
                    </svg>
                  </div>
                </div>

                {/* LATEST ITEM BOUGHT CARD */}
                <div className="glass-card latest-item-card">
                  <div className="latest-left">
                    <span className="card-title-sm">Latest Item Bought</span>
                    <h3 className="latest-item-price">${latestItem.cost.toFixed(2)}</h3>
                    <p className="latest-item-name">{latestItem.title}</p>
                    <span className="latest-tag">Verified Purchase</span>
                  </div>
                  <div className="latest-right">
                    <img src={latestItem.image} alt="Latest Item" className="latest-item-img" />
                  </div>
                </div>

              </div>
            </div>

            {/* ROW 2: METRICS COUNTERS BAR */}
            <div className="metrics-bar-card">
              <div className="metric-box">
                <span className="metric-num">${totalExpenses.toFixed(2)}</span>
                <span className="metric-label">📊 Expenses</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-num text-emerald">${totalProfits.toLocaleString()}</span>
                <span className="metric-label">📈 Profits</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-num">{totalClients}</span>
                <span className="metric-label">👥 Clients</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-num">{totalBoughtItems}</span>
                <span className="metric-label">🛍️ Bought Items</span>
              </div>
            </div>

            {/* ROW 3: BUYING THIS WEEK (TABLE WITH FILTER & MINI GRAPHS) */}
            <div className="glass-card buying-week-section">
              <div className="section-header-flex">
                <div className="section-titles">
                  <h2>Buying This Week</h2>
                  <p>Detailed breakdown of recent acquisitions, costs, and dates.</p>
                </div>
                
                {/* Ascending / Descending Filter */}
                <div className="filter-dropdown-wrapper">
                  <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="filter-select"
                  >
                    <option value="desc">Price: Expensive to Cheap</option>
                    <option value="asc">Price: Cheap to Expensive</option>
                  </select>
                </div>
              </div>

              {/* TABLE LIST */}
              <div className="items-table">
                <div className="table-header-row">
                  <span>Item & Acquisition</span>
                  <span>Category</span>
                  <span>Date</span>
                  <span>Velocity Graph</span>
                  <span>Cost</span>
                </div>

                {sortedItems.map((item) => (
                  <div key={item.id} className="table-row">
                    <div className="table-item-info">
                      <img src={item.image} alt={item.title} className="table-thumb" />
                      <span className="table-item-title">{item.title}</span>
                    </div>
                    <span className="table-category">{item.category}</span>
                    <span className="table-date">{item.date}</span>
                    
                    {/* Mini Graph beside cost */}
                    <div className="table-mini-graph">
                      <svg viewBox="0 0 80 25" className="mini-svg">
                        <path d="M 0 20 Q 20 5, 40 15 T 80 8" fill="none" stroke="#22c55e" strokeWidth="2" />
                      </svg>
                    </div>

                    <span className="table-cost">-${item.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab !== 'dashboard' && (
          <div className="glass-card placeholder-tab">
            <h2>{activeTab.toUpperCase()} Module</h2>
            <p>Synchronized securely with your MERN database repository.</p>
          </div>
        )}
      </main>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <EditProfileModal 
          user={profile} 
          onClose={() => setIsEditModalOpen(false)} 
          onUpdate={(updated) => {
            setProfile(updated);
            localStorage.setItem('userProfile', JSON.stringify(updated));
          }} 
        />
      )}
    </div>
  );
}
