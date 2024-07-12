// src/Palette.js

import React from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

const Palette = ({ colors, onToggleSave, isSaved, onDelete }) => {
  return (
    <div className="Palette">
      {colors.map((color, index) => (
        <ColorBox key={index} color={color} />
      ))}
      {onToggleSave && !isSaved && (
        <button className="save-button" onClick={onToggleSave}>
          {isSaved ? '★' : '☆'}
        </button>
      )}
      {onDelete && (
        <button className="delete-button" onClick={onDelete}>
          🗑
        </button>
      )}
    </div>
  );
};

export default Palette;
