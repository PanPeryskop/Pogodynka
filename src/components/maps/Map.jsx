import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const MapEvents = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => onLocationSelect(e.latlng)
  });
  return null;
};

function Maps() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const defaultPosition = [52.237049, 21.017532];

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
  };

  const handleGetWeather = () => {
    if (selectedLocation) {
      const locationId = `${selectedLocation.lat.toFixed(4)},${selectedLocation.lng.toFixed(4)}`;
      navigate(`/forecast/${locationId}`);
    }
  };

  return (
    <div className="map-container">
      <MapContainer 
        center={defaultPosition} 
        zoom={6} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapEvents onLocationSelect={handleLocationSelect} />
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div className="popup-content">
                <h3>Weather forecast</h3>
                <p>Latitude: {selectedLocation.lat.toFixed(4)}</p>
                <p>Lengitude: {selectedLocation.lng.toFixed(4)}</p>
                <button 
                  className="weather-button"
                  onClick={handleGetWeather}
                >
                  Check weather for this location
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Maps;