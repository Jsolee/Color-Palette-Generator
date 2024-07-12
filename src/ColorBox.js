// src/ColorBox.js

import React, { useState } from 'react';
import './ColorBox.css';

const ColorBox = ({ color }) => {
  const [showNotification, setShowNotification] = useState(false);

  const copyColorCode = () => {
    navigator.clipboard.writeText(color);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1000);
  };

  return (
    <div
      className={`ColorBox ${showNotification ? 'show-notification' : ''}`}
      style={{ backgroundColor: color }}
      onClick={copyColorCode}
    >
      <span>{color}</span>
      {showNotification && <div className="copy-notification">Copied!</div>}
    </div>
  );
};

export default ColorBox;
