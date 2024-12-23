import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";

const customIcon = L.divIcon({
  className: 'custom-pin-icon',
  html: `<div style="color:rgb(33, 58, 180); font-size: 32px;"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

L.Marker.prototype.options.icon = customIcon;


const MapEvents = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => onLocationSelect(e.latlng),
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
      const locationId = `${selectedLocation.lat.toFixed(
        4
      )},${selectedLocation.lng.toFixed(4)}`;
      navigate(`/forecast/${locationId}`);
    }
  };

  return (
    <div className="map-container">
      <MapContainer
        center={defaultPosition}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
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
                <button className="weather-button" onClick={handleGetWeather}>
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
