// src/App.js

import React, { useState, useEffect } from 'react';
import Palette from './Palette';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import './App.css';

function App() {
  const [palettes, setPalettes] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [viewSaved, setViewSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPalettes')) || [];
    setSavedPalettes(saved);
  }, []);

  const generatePalette = () => {
    const newPalette = [];
    for (let i = 0; i < 5; i++) {
      newPalette.push(`#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`);
    }
    setPalettes(prevPalettes => {
      const updatedPalettes = [newPalette, ...prevPalettes];
      return updatedPalettes.slice(0, 5); // Keep only the latest 5 palettes
    });
    setViewSaved(false); // Navigate to generated palettes view
  };

  const toggleSavePalette = (palette) => {
    const isSaved = savedPalettes.some(savedPalette => savedPalette.join() === palette.join());
    const updatedSavedPalettes = isSaved
      ? savedPalettes.filter(savedPalette => savedPalette.join() !== palette.join())
      : [palette, ...savedPalettes];
    setSavedPalettes(updatedSavedPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedSavedPalettes));
  };

  const removeSavedPalette = (palette) => {
    const updatedSavedPalettes = savedPalettes.filter(savedPalette => savedPalette.join() !== palette.join());
    setSavedPalettes(updatedSavedPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedSavedPalettes));
  };

  const navigationButtons = [
    <Button key="generate" onClick={() => { generatePalette(); setViewSaved(false); }}>Generate Palette</Button>,
    <Button key="saved" onClick={() => setViewSaved(true)}>Saved Palettes</Button>,
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Palette Generator</h1>
        {!viewSaved && palettes.map((palette, index) => (
          <Palette
            key={index}
            colors={palette}
            onToggleSave={() => toggleSavePalette(palette)}
            isSaved={savedPalettes.some(savedPalette => savedPalette.join() === palette.join())}
          />
        ))}
        {viewSaved && (
          <>
            <h2>Saved Palettes</h2>
            {savedPalettes.map((palette, index) => (
              <Palette
                key={index}
                colors={palette}
                isSaved
                onDelete={() => removeSavedPalette(palette)}
              />
            ))}
          </>
        )}
      </header>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.1)',
          padding: '1.25rem 0',
        }}
      >
        <ButtonGroup variant="contained" aria-label="Navigation button group">
          {navigationButtons}
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default App;
