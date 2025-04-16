// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyNote from './components/StickyNote';
import './App.css'; // App layout styles

// Define the note colors (pastel palette)
const noteColors = [
  '#fff9c4', // Light Yellow
  '#c8e6c9', // Light Green
  '#bbdefb', // Light Blue
  '#ffcdd2', // Light Pink
  '#f8bbd0', // Another Pink/Purple shade
  '#d1c4e9', // Light Purple
  '#b2dfdb', // Light Teal
  '#ffe0b2', // Light Orange
];

function App() {
  // --- State Management ---
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stickyNotesTheme') || 'dark'; // Default to dark
  });

  // Notes state
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('stickyNotes');
    // Ensure loaded notes also have a color property
    if (savedNotes) {
      try {
          const parsedNotes = JSON.parse(savedNotes);
          // Basic validation: check if it's an array
          if (Array.isArray(parsedNotes)) {
            return parsedNotes.map((note, index) => ({
              id: note.id || Date.now() + index, // Ensure ID exists
              text: note.text || '', // Ensure text exists
              position: note.position || { x: 0, y: 0 }, // Ensure position exists
              // Add color if missing, cycling through colors based on original index
              color: note.color || noteColors[index % noteColors.length]
            }));
          }
      } catch (error) {
          console.error("Failed to parse notes from localStorage:", error);
          // Fallback to empty array if parsing fails or data is invalid
          return [];
      }
    }
    return []; // Start with an empty array if no saved notes or parsing failed
  });

  // --- Theme Handling ---
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('stickyNotesTheme', theme);
  }, [theme]);

  // --- Notes Handling ---
  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = () => {
    const nextNoteIndex = notes.length;
    const newNote = {
      id: Date.now(),
      text: '',
      position: {
        // Position slightly randomly near top-left, cascading
        x: (nextNoteIndex % 8) * 25 + Math.random() * 15,
        y: Math.floor(nextNoteIndex / 8) * 25 + Math.random() * 15,
      },
      color: noteColors[nextNoteIndex % noteColors.length], // Assign color cyclically
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Delete a note
  const deleteNote = useCallback((idToDelete) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idToDelete));
  }, []); // No dependencies, function created once

  // Update note text
  const updateNoteText = useCallback((idToUpdate, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === idToUpdate ? { ...note, text: newText } : note
      )
    );
  }, []); // No dependencies

  // Update note position after dragging stops
  const updateNotePosition = useCallback((idToUpdate, newPosition) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === idToUpdate ? { ...note, position: newPosition } : note
      )
    );
  }, []); // No dependencies

  // --- Rendering ---
  return (
    <div className="app-container">
      <Header toggleTheme={toggleTheme} theme={theme} />

      <main className="notes-area">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            text={note.text}
            position={note.position}
            color={note.color} // Pass the color prop
            onTextChange={updateNoteText}
            onDelete={deleteNote}
            onStop={updateNotePosition}
          />
        ))}
         <button onClick={addNote} className="add-note-button" title="Add New Note">
            + Add Note
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default App;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos