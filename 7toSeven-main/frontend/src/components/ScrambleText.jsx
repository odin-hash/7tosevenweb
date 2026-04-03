import React, { useState, useRef, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

export default function ScrambleText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const startScramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(text
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          if (text[index] === ' ') return ' ';
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const endScramble = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span 
      className={className} 
      onMouseEnter={startScramble} 
      onMouseLeave={endScramble}
    >
      {displayText}
    </span>
  );
}
