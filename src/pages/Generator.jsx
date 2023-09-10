import React, { useState } from 'react';
import '../App.css';

const Generator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');
  const [generatedImageVisible, setGeneratedImageVisible] = useState(false);

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

  return (
    <div id="container">
      <div className="main_body">
        <div id="spacer"/>
        <div id="spacer"/>
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
              <div className='text-input-container'>
                <div id="spacer" />
                <h3>Enter text</h3>
                <div id="small-spacer" />
                <textarea
                  className="form-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div id="spacer" />
              <button type="button" onClick={handleGenerate}>
                Generate
              </button>
            </section>
          </div>
          <div className="grid-item">
            {generatedImageVisible && (
              <div>
                <div id="small-spacer" />
                <div className="image-with-text-container">
                  <img src={selectedImage} alt="Uploaded" width="300" />
                  <div className="overlay-text">{text}</div>
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
