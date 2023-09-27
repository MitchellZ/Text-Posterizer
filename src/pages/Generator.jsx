import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../App.css';

const Generator = () => {
  const text = "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...."; // Replace with your desired text
  const dummytext = "";

  const textRef = useRef(null);
  const dummyRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lettersPerLine, setLettersPerLine] = useState([]);
  const [finishedPrinting, setFinishedPrinting] = useState(false);

  const [characterColors, setCharacterColors] = useState([]);

  const addWord = () => {
    if (currentIndex < text.split(' ').length) {
      const word = text.split(' ')[currentIndex];
      setDisplayedText(prevText => prevText + ' ' + word);
      setCurrentIndex(prevIndex => prevIndex + 1);
      setCharCount(prevCharCount => prevCharCount + word.length);
    }
  };

  useLayoutEffect(() => {
    const containerHeight = dummyRef.current.offsetHeight;
    if (containerHeight > currentHeight) {
      setCurrentHeight(containerHeight);
      if (charCount > 0) setLineCount(prevLineCount => prevLineCount + 1);
    }
  }, [displayedText, currentHeight, charCount]);

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
    }, 20);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currentIndex]);

  useEffect(() => {
    // Consider custom word wrapping logic for future versions
    const wordsInLine = displayedText.trim().split(' ');
    if (!finishedPrinting) wordsInLine.pop();
    var lettersInLine = wordsInLine.reduce((count, word) => count + word.length, 0);

    if (lineCount <= 1 || lettersInLine === 0) return;

    var previousLetters = lettersPerLine.reduce((count, word) => count + word, 0);

    lettersInLine -= previousLetters;

    if (lineCount !== lettersPerLine.length) {
      setLettersPerLine(prevLetters => [...prevLetters, lettersInLine]);
    }
    // eslint-disable-next-line
  }, [lineCount, finishedPrinting]);

  // Print the size of the image
  useEffect(() => {
    const image = new Image();
  image.src = "./posters/star-wars-poster.jpg";
  console.debug(`Image width: ${image.width}, height: ${image.height}`);
  },[finishedPrinting]);
  
  // Function to get pixel color from the image
  const getPixelColor = (index, character, line, position, totalCharsInLine) => {
    const image = new Image();
    image.src = "./posters/star-wars-poster.jpg"; // Replace with the actual image path
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
  
    // Calculate the position based on line and position in the line
    const x = Math.round((image.width * (position / totalCharsInLine)) - (image.width/totalCharsInLine * 0.5));
    const y = Math.round((image.height * (line / lineCount)) - (image.height/lineCount * 0.5));

    console.debug(`Char: '${character}' in Line: ${line} for index ${index}, Position: ${position} of ${totalCharsInLine}, X: ${x}, Y: ${y}`);
  
    const pixel = context.getImageData(x, y, 1, 1).data;
    return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 1)`;
  };
  

  const handleColorChange = () => {
    const colors = Array.from(displayedText).map((char, index) => {
      if (char === ' ') {
        // If the character is a space, return a transparent color
        return 'rgba(0, 0, 0, 0)';
      }
      return getPixelColor(index, char, getLineByIndex(index), getPositionInLineByIndex(index), getTotalCharsInLine(getLineByIndex(index)));
    });
    setCharacterColors(colors);
  };
  

  // Function to get the line number by character index, excluding spaces
function getLineByIndex(index) {
  // For each line add the total number of characters in the line until the character index
  let line = 1;
  let charsAtLineCount = 0;
  for (let i = 0; i < lettersPerLine.length; i++) {
    charsAtLineCount += lettersPerLine[i];
    if (charsAtLineCount > getPositionByIndex(index) - 1) {
      return line;
    }
    line++;
  }
}


// Function to get the position (character index within the line) by the overall character index
function getPositionInLineByIndex(index) {
  let lettersInPriorLines = 0;

  // Set letters in prior lines
  for (let i = 0; i < getLineByIndex(index) - 1; i++) {
    lettersInPriorLines += lettersPerLine[i];
  }

  //console.debug(`Counted letters in prior lines: ${lettersInPriorLines}`);

return getPositionByIndex(index) - lettersInPriorLines;
  
}

// Function to get the total number of characters in a line by the line index
function getTotalCharsInLine(line) {
  //console.debug(`Line ${line} has ${lettersPerLine[line - 1]} characters`);
  return lettersPerLine[line - 1];
}

function getPositionByIndex(index) {
  // Return the number of characters that are not spaces up to this index
  let charCount = 0;

  for (let i = 0; i < index; i++) {
    if (displayedText.charAt(i) !== ' ') {
      charCount++;
    }
  }

  return charCount + 1;
}


  return (
    <div className="grid-container">
      <div className="grid-item">
        <div className="line-counts">
          <h1>Metadata</h1>
          <br />
          Height of Dummy Element: {currentHeight}px <br />
          Line Count: {lineCount} <br />
          Character Count: {charCount} <br />
          Characters Per Line: {lettersPerLine.join(', ')}
          <br />
          <br />
          <button onClick={handleColorChange}>Colorize</button>
        </div>
      </div>
      <div className='grid-item'>
        <div className='image-container'>
          <img src="./posters/star-wars-poster.jpg" alt="Star Wars Poster" />
          <div className='text-overlay' ref={textRef}></div>
          <div className='dummy' ref={dummyRef}>
            <span>
              {dummytext}
              {displayedText.split('').map((char, index) => (
                <span key={index} style={{ color: characterColors[index] }}>
                  {char}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;