import React from 'react';
import styled from 'styled-components';

const HelpButton = ({ onClick, showHelp, isClosing }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        Help
      </button>
      
      {showHelp && (
        <div className={`help-popup ${isClosing ? "close" : ""}`}>
          <div className="help-overlay" onClick={onClick}></div>
          <div className="help-content">
            <h2>How to Use</h2>
            <ul>
              <li>Click on the map to place a marker</li>
              <li>Press "Check weather for this location" for a forecast</li>
              <li>
                If window doesn't appear, try double-clicking on the city or marker
              </li>
            </ul>
            <button className="close-button" onClick={onClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    --glow-color: rgb(217, 176, 255);
    --glow-spread-color: rgba(191, 123, 255, 0.781);
    --enhanced-glow-color: rgb(231, 206, 255);
    --btn-color: rgb(100, 61, 136);
    border: .25em solid var(--glow-color);
    padding: 1em 2em; 
    color: var(--glow-color);
    font-size: 15px;
    font-weight: bold;
    background-color: var(--btn-color);
    border-radius: 1em;
    outline: none;
    box-shadow: 0 0 1em .25em var(--glow-color),
           0 0 4em 1em var(--glow-spread-color),
           inset 0 0 .75em .25em var(--glow-color);
    text-shadow: 0 0 .5em var(--glow-color);
    position: fixed;
    bottom: 1.5rem;
    right: 7.5rem;
    transition: all 0.3s;
    cursor: pointer;
    z-index: 999;
  }

  button::after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 120%;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--glow-spread-color);
    filter: blur(2em);
    opacity: .7;
    transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
  }

  button:hover {
    color: var(--btn-color);
    background-color: var(--glow-color);
    box-shadow: 0 0 1em .25em var(--glow-color),
           0 0 4em 2em var(--glow-spread-color),
           inset 0 0 .75em .25em var(--glow-color);
  }

  button:active {
    box-shadow: 0 0 0.6em .25em var(--glow-color),
           0 0 2.5em 2em var(--glow-spread-color),
           inset 0 0 .5em .25em var(--glow-color);
  }

  .help-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .help-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }

  .help-content {
    color: #333;
    
    h2 {
      margin-top: 0;
      color: #222;
    }

    ul {
      padding-left: 1.2rem;
    }

    li {
      margin: 0.5rem 0;
    }
  }

  .close-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    position: static;
    width: auto;
    font-size: 14px;
  }

    .help-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    z-index: 1000;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .help-content {
    color: white;
    
    h2 {
      margin-top: 0;
      color: white;
    }

    ul {
      padding-left: 1.2rem;
    }

    li {
      margin: 0.5rem 0;
    }
  }

    .close-button {
    margin-top: 1rem !important;
    padding: 0.5rem 1rem !important;
    font-size: 14px !important;
    background: #8b5cf6 !important;
    color: #fff !important;
    border-radius: 4px !important;
    cursor: pointer !important;
    z-index: 1001 !important;

    &:hover {
      background: #8b5cf6 !important;
    }
}
`;

export default HelpButton;