// src/components/StickyNote.jsx
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';
import '../styles/StickyNote.css';

const MAX_WORDS = 50;
// Simple approximation: average word length * max words + spaces
const APPROX_CHAR_LIMIT = MAX_WORDS * 6;

function StickyNote({ id, text, position, color, onTextChange, onDelete, onStop }) {
  const nodeRef = useRef(null); // Create a ref for Draggable

  const handleTextChange = (event) => {
    const newText = event.target.value;
    // Simple word count: split by whitespace and filter empty strings
    const wordCount = newText.trim().split(/\s+/).filter(Boolean).length;

    // Allow typing if under word limit OR if deleting characters (even if over limit)
    if (wordCount <= MAX_WORDS || newText.length < text.length) {
         // Also check character limit as a fallback safeguard
         if (newText.length <= APPROX_CHAR_LIMIT || newText.length < text.length) {
             onTextChange(id, newText);
         } else {
            // Optionally provide feedback about char limit if you want
            console.log("Approximate character limit reached");
         }
    } else {
      console.log("Word limit reached!");
      // Optionally provide visual feedback (e.g., flash border red)
    }
  };

  const handleDragStop = (e, data) => {
    // Only update if position actually changed to prevent unnecessary re-renders
    if (data.x !== position.x || data.y !== position.y) {
        onStop(id, { x: data.x, y: data.y });
    }
  };

  // --- THIS IS THE FIX ---
  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Prevent this click from triggering drag events
    onDelete(id);
  };
  // --- END OF FIX ---

  return (
    <Draggable
      nodeRef={nodeRef} // Pass the ref to Draggable
      handle=".sticky-note-header" // Drag only via the header
      position={position}
      onStop={handleDragStop}
      bounds="parent" // Keep notes within the ".notes-area" padding box
    >
      {/* Attach the ref to the direct child div */}
      <div
        ref={nodeRef}
        className="sticky-note"
        style={{ backgroundColor: color }} // Apply the specific note color
      >
        <div className="sticky-note-header">
          {/* This div acts as the handle */}
          <button
            // Use the new handler with stopPropagation
            onClick={handleDeleteClick}
            className="delete-note-button"
            aria-label="Delete Note"
            title="Delete Note"
          >
            <FaTimes />
          </button>
        </div>
        <textarea
          className="sticky-note-textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Write note..." // Shorter placeholder
          rows="6" // Adjust rows if needed based on height/font size
          // maxLength={APPROX_CHAR_LIMIT} // Use maxLength for hard char limit
          aria-label="Sticky note text area"
          // Optional: Prevent drag start from textarea on mobile if needed
          // onTouchStart={(e) => e.stopPropagation()}
        />
      </div>
    </Draggable>
  );
}

export default StickyNote;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos