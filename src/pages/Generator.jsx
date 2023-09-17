import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../App.css';

const Generator = () => {
  const text = "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....";
  const dummytext = "";

  const textRef = useRef(null);
  const dummyRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0); // New state for character count
  const [lettersPerLine, setLettersPerLine] = useState([]); // New state for letters per line
  const [finishedPrinting, setFinishedPrinting] = useState(false);

  const addWord = () => {
    if (currentIndex < text.split(' ').length) {
      const word = text.split(' ')[currentIndex];
      setDisplayedText(prevText => prevText + ' ' + word);
      setCurrentIndex(prevIndex => prevIndex + 1);
      setCharCount(prevCharCount => prevCharCount + word.length); // Increment character count
    }
  };

  useLayoutEffect(() => {
    // Check the current height of the dummy element and update line count and height
    const containerHeight = dummyRef.current.offsetHeight;
    if (containerHeight > currentHeight) {
      setCurrentHeight(containerHeight);
      if (charCount > 0)
        setLineCount(prevLineCount => prevLineCount + 1); // Increment line count
    }
  }, [displayedText, currentHeight]);

  useEffect(() => {
    const textContainer = textRef.current;
    let currentLine = '';

    const interval = setInterval(() => {
      addWord();
      textContainer.textContent = dummytext + currentLine;

      if (currentIndex === text.split(' ').length) {
        setFinishedPrinting(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currentIndex]);

  useEffect(() => {
    // Calculate the number of letters in the current line excluding the last word
    const wordsInLine = displayedText.trim().split(' ');
    // Eliminate the last word (unless it's the last line)
    if (!finishedPrinting)
      wordsInLine.pop();
    var lettersInLine = wordsInLine.reduce((count, word) => count + word.length, 0);

    if (lineCount <= 1 || lettersInLine === 0)
      return;

    // Add all the letters from the previous lines
    var previousLetters = lettersPerLine.reduce((count, word) => count + word, 0);

    lettersInLine -= previousLetters;

    // Check if the line count has changed before logging letters per line
    if (lineCount !== lettersPerLine.length) {
      setLettersPerLine(prevLetters => [...prevLetters, lettersInLine]);
    }
    // eslint-disable-next-line
  }, [lineCount, finishedPrinting]);

  return (
    <div className="grid-container">
      <div className="grid-item">
        <div className="line-counts">
          <h1>Metadata</h1>
          <br />
          Height of Dummy Element: {currentHeight}px <br />
          Line Count: {lineCount} <br />
          Letter Count: {charCount} <br />
          Letters Per Line: {lettersPerLine.join(', ')}
        </div>
      </div>
      <div className='grid-item'>
        <div className='image-container'>
          <img src="https://www.photomural.com/media/catalog/product/cache/2/thumbnail/9df78eab33525d08d6e5fb8d27136e95/0/2/026-dvd2_star_wars_poster_classic_1_web.jpg" alt="Star Wars Poster" />
          <div className='text-overlay' ref={textRef}></div>
          <div className='dummy' ref={dummyRef}>
            <span>{dummytext}{displayedText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
