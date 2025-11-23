import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Alerts() {
  useEffect(() => {
    socket.on('balanceToggleAlert', (data) => {
      // Here you can show an alert, update state, or use a notification library
      alert(data.message);
    });
    
    socket.on('downloadHistoryAlert', (data) => {
      alert(data.message);
    });

    socket.on('transferAlert', (data) => {
        // Show a real‑time alert to the admin
        alert(data.message);
      });
    
    // Clean up the listeners on unmount
    return () => {
      socket.off('balanceToggleAlert');
      socket.off('downloadHistoryAlert');
      socket.off('transferAlert');
    };
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Waiting for alerts...</p>
    </div>
  );
}

export default Alerts;
