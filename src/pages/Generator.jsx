import React, { useState, useEffect } from 'react';
import '../App.css';

const Generator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('16'); // Initial font size
  const [lineHeight, setLineHeight] = useState('1.2'); // Initial line height
  const [padding, setPadding] = useState('5');
  const [generatedImageVisible, setGeneratedImageVisible] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (selectedImage && text) {
      setGeneratedImageVisible(true);
    }
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleLineHeightChange = (e) => {
    setLineHeight(e.target.value);
  };

  const handlePaddingChange = (e) => {
    setPadding(e.target.value);
  };

  const overlayTextStyle = {
    fontSize: `${fontSize}px`, // Add "px" to the font size
    lineHeight,
    padding: `${padding}px`,
    width: `calc(100% - ${padding * 2}px)`,
  };

  const calculateNumberOfLines = () => {
    const overlayTextContainer = document.querySelector('.overlay-text');
    if (overlayTextContainer) {
      const overlayHeight = overlayTextContainer.clientHeight;
      const lineHeightValue = parseFloat(lineHeight);
      const calculatedLines = overlayHeight / (parseFloat(fontSize) * lineHeightValue);
  
      // Count the '\n' characters in the text
      const newlineCount = (text.match(/\n/g) || []).length;
  
      setNumberOfLines(calculatedLines.toFixed(2));
      
      // Log the number of '\n' characters
      console.log(`Number of '\\n' characters: ${newlineCount}`);
    }
  };
  

  useEffect(() => {
    calculateNumberOfLines();
    
    // TODO: Add function to calculate number of characters per line

    // eslint-disable-next-line
  }, [text, lineHeight, fontSize, padding]);

  return (
    <div id="container">
      <div className="main_body">
        <div id="spacer" />
        <div id="spacer" />
        <div className="grid-container">
          <div className="grid-item">
            <section className="parameters_form">
              <div className="image-upload-container">
                <h3>Upload an image</h3>
                <div id="small-spacer" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control mb-3"
                />
                {selectedImage && (
                  <div>
                    <div id="small-spacer" />
                    <h4>Preview:</h4>
                    <div id="small-spacer" />
                    <img src={selectedImage} alt="Uploaded" width="300" />
                  </div>
                )}
              </div>
              <div className="text-input-container">
                <div id="spacer" />
                <h3>Enter text</h3>
                <div id="small-spacer" />
                <textarea
                  className="form-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              {generatedImageVisible && (
                <div>
                  <div id="spacer" />
                  <h3>Overlay Alignment</h3>
                  <div id="small-spacer" />
                  <label htmlFor="fontSize">Font Size:</label>
                  <div id="small-spacer" />
                  <input
                    type="number"
                    id="fontSize"
                    value={fontSize}
                    step="0.1"
                    onChange={handleFontSizeChange}
                  />
                  <div id="small-spacer" />
                  <label htmlFor="lineHeight">Line Height:</label>
                  <div id="small-spacer" />
                  <input
                    type="number"
                    id="lineHeight"
                    value={lineHeight}
                    step="0.01"
                    onChange={handleLineHeightChange}
                  />
                  <div id="small-spacer" />
                  <label htmlFor="padding">Padding:</label>
                  <div id="small-spacer" />
                  <input
                    type="number"
                    id="padding"
                    value={padding}
                    onChange={handlePaddingChange}
                  />
                </div>
              )}
              <div>Number of Lines: {Math.floor(numberOfLines)}</div>
              <div id="spacer" />
              <button type="button" onClick={handleGenerate}>
                Generate
              </button>
            </section>
          </div>
          <div className="grid-item" id="image-with-text">
            {generatedImageVisible && (
              <div>
                <div id="small-spacer" />
                <div className="image-with-text-container">
                  <img src={selectedImage} alt="Uploaded" width="300" />
                  <div className="overlay-text" style={overlayTextStyle}>
                    {text}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="spacer" />
        <div id="spacer" />
      </div>
    </div>
  );
};

export default Generator;