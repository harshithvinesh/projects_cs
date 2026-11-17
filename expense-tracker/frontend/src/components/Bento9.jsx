import React from 'react';
import './Bento9.css';

export default function Bento9({ expenses }) {
  // Generate daily expense histogram data for the last 30 days
  const histogramData = Array.from({ length: 30 }, (_, i) => {
    const day = 30 - i;
    // Mock or compute dynamic heights based on actual expenses
    const randomAmount = Math.floor(Math.random() * 120) + 20;
    return { day, height: randomAmount };
  });

  const totalMonthly = histogramData.reduce((acc, curr) => acc + curr.height, 0);

  return (
    <div className="bento-card bento-9">
      <div className="bento-header">
        <div>
          <span className="bento-subtitle">Daily Spending Velocity</span>
          <h2 className="bento-metric">${totalMonthly.toLocaleString()} <span className="metric-period">this month</span></h2>
        </div>
        <div className="bento-badge">
          <span>↓ 18% vs last month</span>
        </div>
      </div>

      <p className="bento-description">
        Expense velocity spiked around mid-month deployments and equipment upgrades, stabilizing sharply thereafter.
      </p>

      {/* Histogram Chart */}
      <div className="histogram-container">
        <div className="histogram-grid">
          {histogramData.map((bar, index) => (
            <div 
              key={index} 
              className={`histogram-bar ${index > 20 ? 'recent-deploy' : ''}`}
              style={{ height: `${Math.max(bar.height, 15)}px` }}
              title={`Day -{bar.day}: ${bar.height}`}
            ></div>
          ))}
        </div>
        <div className="histogram-axis">
          <span>30 days ago</span>
          <span className="axis-marker">▲ payroll / budget reset</span>
          <span>today</span>
        </div>
      </div>
    </div>
  );
}
