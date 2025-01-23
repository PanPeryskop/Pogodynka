import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Maps from "../../components/maps/Map.jsx";
import HelpButton from "../../components/Help.jsx";
import "./Maps.css";

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
      <div className="maps-content">
        <header className="maps-header">
          <h1>Interactive Weather Map</h1>
          <p className="subtitle">Find weather information for any location</p>
        </header>

        <div className="map-frame">
          <Maps />
        </div>

        <HelpButton 
          onClick={toggleHelp}
          showHelp={showHelp}
          isClosing={isClosing}
        />
      </div>
    </div>
  );
}

export default MapsPage;