import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Forecast.css';

const getCoordinates = async (locationId) => {
  if (locationId?.includes(',')) {
    const [lat, lon] = locationId.split(',').map(coord => parseFloat(coord));
    const locationName = await getLocationName(lat, lon);
    return { lat, lon, name: locationName };
  }
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${locationId}&count=1&language=en&format=json`
  );
  const data = await response.json();
  console.log(data);
  if (!data.results?.length) throw new Error('Location not found');
  return { 
    lat: data.results[0].latitude, 
    lon: data.results[0].longitude,
    name: data.results[0].name 
  };
};

const getLocationName = async (lat, lon) => {
    try {
      // Use Nominatim for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
        {
          headers: {
            'User-Agent': 'WeatherApp/1.0'
          }
        }
      );
      const data = await response.json();
      // Extract city or town name from address
      return data.address?.city || 
             data.address?.town || 
             data.address?.village || 
             data.address?.municipality ||
             `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
      return `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
    }
  };

const getIpLocation = async () => {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();
  return {
    lat: data.latitude,
    lon: data.longitude,
    name: data.city
  };
};

function Forecast() {
  const { locationId } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        let location;

        if (locationId) {
          location = await getCoordinates(locationId);
        } else {
          location = await getIpLocation();
        }

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_probability_mean&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
        );

        if (!response.ok) throw new Error('Weather API failed');
        
        const data = await response.json();
        setWeather({ ...data, locationName: location.name });
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [locationId]);

  if (loading) {
    return <div className="loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="forecast-page">
      <div className="forecast-content">
        <header className="forecast-header">
          <h1>Weather Forecast</h1>
          <p className="location-name">{weather.locationName}</p>
        </header>

        <div className="current-weather">
          <h2>Current Weather</h2>
          <div className="weather-card">
            <div className="temperature">
              {Math.round(weather.current.temperature_2m)}°C
            </div>
            <div className="details">
              <p>Humidity: {weather.current.relative_humidity_2m}%</p>
              <p>Wind: {Math.round(weather.current.wind_speed_10m)} km/h</p>
            </div>
          </div>
        </div>

        <div className="daily-forecast">
          <h2>7-Day Forecast</h2>
          <div className="forecast-grid">
            {weather.daily.time.map((date, index) => (
              <div key={date} className="day-card">
                <h3>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                <p className="max-temp">
                  {Math.round(weather.daily.temperature_2m_max[index])}°C
                </p>
                <p className="min-temp">
                  {Math.round(weather.daily.temperature_2m_min[index])}°C
                </p>
                <p className="wind">
                  {Math.round(weather.daily.windspeed_10m_max[index])} km/h
                </p>
                <p className="rain">
                  {weather.daily.precipitation_probability_mean[index]}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;