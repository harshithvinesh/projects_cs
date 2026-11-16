import React from 'react';
import LightTunnel from './LightTunnel';
export default function Welcome({ onGetStarted }) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Animation Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <LightTunnel
          cableColor="#3b82f6"
          pulseColor="#28a745"
          cableCount={64}
          pulseDensity={0.6}
          speed={0.15}
          mouseInteraction
          clickSurge
        />
      </div>

      {/* Foreground Overlay Content */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        pointerEvents: 'none',
        padding: '20px'
      }}>
            <h1 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '4.2rem', 
            fontWeight: 600,
            color: '#fff', 
            margin: '0 0 12px 0', 
            letterSpacing: '-0.02em',
            textShadow: '0 0 35px rgba(59, 130, 246, 0.5)'
            }}>
            Know Your Money
            </h1>

        <p style={{ 
          color: '#94a3b8', // Softer slate gray instead of harsh white/gray
          fontSize: '1.15rem', 
          fontWeight: 400,
          marginBottom: '35px', 
          maxWidth: '460px',
          lineHeight: '1.6'
        }}>
          Take control of your finances with real-time tracking, insights, and complete clarity.
        </p>

        <button 
          onClick={onGetStarted}
          style={{ 
            pointerEvents: 'auto',
            fontFamily: "'Inter', sans-serif",
            padding: '14px 32px', 
            fontSize: '15px', 
            fontWeight: 600, 
            background: '#2563eb', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)',
            transition: 'all 0.2s ease'
          }}
        >
          Enter Dashboard
        </button>
      </div>

    </div>
  );
}
