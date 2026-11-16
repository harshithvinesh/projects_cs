import React from 'react';
import LightTunnel from './LightTunnel';

export default function Welcome({ onGetStarted }) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* 1. The Animation Background */}
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

      {/* 2. Foreground Overlay Content ("Know Your Money") */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        pointerEvents: 'none', // Allows clicks to pass through to the tunnel background
        padding: '20px'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          color: '#fff', 
          margin: '0 0 10px 0', 
          textShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
          letterSpacing: '2px'
        }}>
          Know Your Money
        </h1>
        <p style={{ 
          color: '#aaa', 
          fontSize: '1.2rem', 
          marginBottom: '30px', 
          maxWidth: '500px' 
        }}>
          Take control of your finances with real-time tracking, insights, and complete clarity.
        </p>

        {/* Re-enable pointer events for the button so it's clickable */}
        <button 
          onClick={onGetStarted}
          style={{ 
            pointerEvents: 'auto',
            padding: '12px 30px', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            background: '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.4)',
            transition: 'transform 0.2s'
          }}
        >
          Enter Dashboard
        </button>
      </div>

    </div>
  );
}
