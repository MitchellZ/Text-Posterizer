import * as React from 'react';
import '../App.css';

// Defining the Generator component
const Generator = () => {

  // Begin HTML Template
  return (
    <div id="container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div className="main_body">
        <div className="welcome">
          <h1>Welcome to Text Posterizer!</h1>
        </div>
        <section className="parameters_form">
          <button type="button">
            Generate
          </button>
        </section>
        <br />
        <section
          className="slides"
          style={{ display: 'none' }}
        >
          <div className="slide" style={{ display: 'none' }}>
            <p id="slideText">TRIVIA</p>
          </div>
          <p id="fullscreen">
            <span className="material-symbols-outlined">
              fullscreen
            </span>
          </p>
        </section>

        <section className="noResults" style={{ display: 'none' }}>
          <br />
          <p style={{ color: 'red' }}>
            Failed! Not enough questions to fulfill parameters.
          </p>
          <p>Please modify your parameters and try again.</p>
        </section>

        <section className="answerKey">
          <div className="keyDisplay">
            <label className="keyLabel" style={{ display: 'none' }}>
              Answer Key
            </label>
            <br />
            <div className="keyLink" style={{ display: 'none' }}>
              <input
                id="linkText"
                type="text"
                readOnly
              />{' '}
              <div id="copyButton">
                <span className="material-symbols-outlined">content_copy</span>
              </div>
            </div>
          </div>
        </section>

        <div id="spacer"></div>
      </div>
    </div>
  );
};

export default Generator;