import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png'
function Header() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // If you only want time: now.toLocaleTimeString()
      setCurrentTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <img src={logo}></img>
      <div className="text-gray-700">
        System Time: {currentTime}
      </div>
    </header>
  );
}

export default Header;
