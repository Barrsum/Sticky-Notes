// src/components/Header.jsx
import React from 'react';
import '../styles/Header.css'; // Import component-specific styles

function Header({ toggleTheme, theme }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="title-credits">
            <h1>Sticky Notes</h1>
            <p className="creator-credit">Created by - Ram Bapat</p>
        </div>
        <button onClick={toggleTheme} className="theme-toggle-button" title="Toggle Theme">
          {/* Display icon and text based on the current theme */}
          {theme === 'dark' ? (
            <>☀️ <span className="toggle-text">Light Mode</span></>
          ) : (
            <>🌙 <span className="toggle-text">Dark Mode</span></>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos