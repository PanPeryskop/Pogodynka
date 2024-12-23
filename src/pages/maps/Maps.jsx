import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Maps from '../../components/maps/Map.jsx';
// import NavigationBar from '../../components/Navigation.jsx';
import './Maps.css';

function MapsPage() {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleHelp = () => {
    if (showHelp && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setShowHelp(false);
        setIsClosing(false);
      }, 800); 
    } else {
      setShowHelp(true);
    }
  };


  return (
    <div className="maps-page">
      {/* <NavigationBar /> */}
      <div className="maps-content">
        <header className="maps-header">
          <h1>Interactive Weather Map</h1>
          <p className="subtitle">Find weather information for any location</p>
        </header>

        <div className="map-frame">
          <Maps />
        </div>

        <button className="help-button" onClick={toggleHelp}>?</button>

        {showHelp && (
          <div className={`help-popup ${isClosing ? 'close' : ''}`}>
            <div className="help-overlay" onClick={toggleHelp}></div>
            <div className="help-content">
              <h2>How to Use</h2>
              <ul>
                <li>Click on the map to place a marker</li>
                <li>Drag the marker to refine location</li>
                <li>Press "Check weather for this location" for a forecast</li>
              </ul>
              <button className="close-button" onClick={toggleHelp}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapsPage;