// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          title="LinkedIn Profile"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Barrsum/Sticky-Notes.git"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repo"
          title="GitHub Repo"
        >
          <FaGithub />
        </a>
      </div>
      <p className="connect-text">
        Connect via LinkedIn | View Source on GitHub
      </p>
      <p className="footer-credit">Sticky Notes App | Created By Ram Bapat</p>
    </footer>
  );
}

export default React.memo(Footer);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos