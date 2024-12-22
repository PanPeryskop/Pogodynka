import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiWindDeg, WiHumidity, WiStrongWind, WiRaindrops, WiDust, WiDayFog, WiThunderstorm } from 'react-icons/wi';
import { MdLocationOn, MdSearch, MdMap, MdAir } from 'react-icons/md';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Metric, Text } from "@tremor/react";
import './Forecast.css';
import NotFound from '../../components/Error.jsx';
import Loader from '../../components/Loading.jsx';
import Rainy from '../../components/weather/Rain.jsx';
import Sunny from '../../components/weather/sunny.jsx';
import Clouds from '../../components/weather/Couds.jsx';
import SunClouds from '../../components/weather/Suncouds.jsx';

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
  console.log('Geocoding Response:', {
    query: locationId,
    response: data,
    timestamp: new Date().toISOString()
  });
  if (!data.results?.length) throw new Error('Location not found');
  return { 
    lat: data.results[0].latitude, 
    lon: data.results[0].longitude,
    name: data.results[0].name 
  };
};

const getAQIColor = (aqi) => {
  if (aqi <= 50) return '#22c55e';
  if (aqi <= 100) return '#eab308';
  if (aqi <= 150) return '#f97316';
  return '#ef4444';
};

const GetWeatherName = (weatherCode) => {
  if (weatherCode <= 1) return 'Sunny';
  if (weatherCode <= 3) return 'Partly Cloudy';
  if (weatherCode >= 45 && weatherCode <= 48) return 'Foggy';
  if (weatherCode >= 51 && weatherCode <= 55) return 'Drizzle';
  if (weatherCode >= 61 && weatherCode <= 65) return 'Rain';
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snow';
  if (weatherCode >= 80 && weatherCode <= 82) return 'Rain Showers';
  if (weatherCode >= 95) return 'Thunderstorm';
  return 'Cloudy';
};

const getCurrentWeatherIcon = (weatherCode) => {
  return (
    <div className="small-weather-icon">
      {weatherCode <= 1 ? <Sunny /> :
       weatherCode <= 3 ? <SunClouds /> :
       (weatherCode >= 51 && weatherCode <= 55) || 
       (weatherCode >= 61 && weatherCode <= 65) ||
       (weatherCode >= 80 && weatherCode <= 82) ? <Rainy /> :
       weatherCode >= 71 && weatherCode <= 77 ? <Snowy /> :
       <Clouds />}
    </div>
  );
};

const getWeatherComponent = (weatherCode) => {
  return (
    <div className="weather-display">
      <p className="weather-name">{GetWeatherName(weatherCode)}</p>
      <div className="weather-icon">
        {weatherCode <= 1 ? <Sunny /> :
         weatherCode <= 3 ? <SunClouds /> :
         (weatherCode >= 51 && weatherCode <= 55) || 
         (weatherCode >= 61 && weatherCode <= 65) ||
         (weatherCode >= 80 && weatherCode <= 82) ? <Rainy /> :
         weatherCode >= 71 && weatherCode <= 77 ? <Rainy /> :
         <Clouds />}
      </div>
    </div>
  );
};


const getLocationName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
        {
          headers: {
            'User-Agent': 'WeatherApp/1.0'
          }
        }
      );
      const data = await response.json();
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
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();
  
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
      const location = await geoResponse.json();
  
      if (location.status === 'success') {
        return {
          lat: location.lat,
          lon: location.lon,
          name: location.city
        };
      }
      throw new Error('Location lookup failed');
      
    } catch (err) {
      console.error('IP location failed:', err);
      // Fallback to default location
      return {
        lat: 52.2297,
        lon: 21.0122,
        name: 'Warsaw'
      };
    }
  };

// End of functions section

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
          try {
            location = await getIpLocation();
          } catch (err) {
            console.error('IP location failed, using default:', err);
            location = {
              lat: 52.2297,
              lon: 21.0122,
              name: 'Warsaw'
            };
          }
        }

        const [weatherResponse, airQualityResponse] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,precipitation_probability,cloudcover,uv_index,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,windspeed_10m_max,weathercode&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,visibility,apparent_temperature,weathercode&timezone=auto`),
          fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.lat}&longitude=${location.lon}&current=us_aqi,pm10,pm2_5,uv_index`)
        ]);

        const [weatherData, airQualityData] = await Promise.all([
          weatherResponse.json(),
          airQualityResponse.json()
        ]);

        setWeather({
          ...weatherData,
          airQuality: airQualityData,
          locationName: location.name
        });
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
    return <Loader />;
  }

  if (error) {
    return (
      <div className="forecast-page">
        <div className="forecast-content">
          <NotFound />
        </div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="forecast-page">
      <div className="forecast-content">
        <header className="forecast-header">
          <h1>Weather Forecast</h1>
          <p className="forecast-location">{weather.locationName}</p>
        </header>
  
        <div className="forecast-layout">
          <motion.div 
            className="forecast-current-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="weather-header">
              <div className="header-with-icon">
                <h2 id='current-we'>Current Weather</h2>
                {getCurrentWeatherIcon(weather.current.weathercode)}
              </div>
              <Metric>{Math.round(weather.current.temperature_2m)}°C</Metric>
            </div>
          
            <div className="charts">
              <div className="chart-container">
                <h3>24h Temperature</h3>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={weather.hourly.time.slice(0, 24).map((time, i) => ({
                    time: new Date(time).getHours() + 'h',
                    temp: weather.hourly.temperature_2m[i]
                  }))}>
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{fontSize: 12}} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="#8b5cf6"
                      fill="url(#tempGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          
              <div className="chart-container">
                <h3>Precipitation</h3>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={weather.hourly.time.slice(0, 24).map((time, i) => ({
                    time: new Date(time).getHours() + 'h',
                    rain: weather.hourly.precipitation_probability[i]
                  }))}>
                    <defs>
                      <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{fontSize: 12}} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="rain"
                      stroke="#22c55e"
                      fill="url(#rainGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          
            <div className="city-details">
              <Card decoration="top" className="metric-card">
                <div className="metric-content">
                  <Text>Humidity</Text>
                  <Metric>{weather.current.relative_humidity_2m}%</Metric>
                </div>
              </Card>
              <Card decoration="top" className="metric-card">
                <div className="metric-content">
                  <Text>Wind</Text>
                  <div className="wind-info">
                    <Metric>{Math.round(weather.current.wind_speed_10m)} km/h</Metric>
                    <WiWindDeg style={{
                      transform: `rotate(${weather.current.wind_direction_10m}deg)`,
                      fontSize: '1.5rem'
                    }}/>
                  </div>
                </div>
              </Card>
              <Card decoration="top" className="metric-card">
                <div className="metric-content">
                  <Text>Air Quality</Text>
                  <Metric style={{ color: getAQIColor(weather.airQuality.current.us_aqi) }}>
                    {weather.airQuality.current.us_aqi} AQI
                  </Metric>
                </div>
              </Card>
            </div>
          </motion.div>

          <div className="daily-forecast">
            <h2 id='week-forecast'>7-Day Forecast</h2>
            <div className="forecast-grid">
              {weather.daily.time.map((date, index) => (
                <div key={date} className="day-card">
                <h3 id='day-namee'>{new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</h3>

                <div className="weather-icon">
                {getWeatherComponent(weather.daily.weathercode[index])}
                </div>
                
                <div className="temperature-section">
                  <div className="temp-info">
                    <p className="max-temp">
                      <span className="label">Max:</span>
                      <span className="value">{Math.round(weather.daily.temperature_2m_max[index])}°C</span>
                    </p>
                    <p className="min-temp">
                      <span className="label">Min:</span>
                      <span className="value">{Math.round(weather.daily.temperature_2m_min[index])}°C</span>
                    </p>
                  </div>
                  
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={100}>
                      <AreaChart data={weather.hourly.time.slice(index * 24, (index + 1) * 24).map((time, i) => ({
                        time: new Date(time).getHours() + 'h',
                        temp: weather.hourly.temperature_2m[i + index * 24]
                      }))}>
                        <XAxis dataKey="time" tick={{fontSize: 10}} />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip />
                        <Area type="monotone" dataKey="temp" stroke="#8b5cf6" fill="url(#tempGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={100}>
                      <AreaChart data={weather.hourly.time.slice(index * 24, (index + 1) * 24).map((time, i) => ({
                        time: new Date(time).getHours() + 'h',
                        precipitation: weather.hourly.precipitation_probability[i + index * 24]
                      }))}>
                        <defs>
                          <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" tick={{fontSize: 10}} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="precipitation" 
                          stroke="#22c55e" 
                          fill="url(#rainGradient)"
                          unit="%"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              
                <div className="weather-metrics">
                  <div className="metric">
                    <WiStrongWind className="icon" />
                    <div className="metric-data">
                      <span className="label">Wind</span>
                      <span className="value">{Math.round(weather.daily.windspeed_10m_max[index])} km/h</span>
                    </div>
                  </div>
              
                  <div className="metric">
                    <WiRaindrops className="icon" />
                    <div className="metric-data">
                      <span className="label">Precipitation</span>
                      <span className="value">{weather.daily.precipitation_probability_mean[index]}%</span>
                    </div>
                  </div>
              
                  <div className="metric">
                    <WiHumidity className="icon" />
                    <div className="metric-data">
                      <span className="label">Humidity</span>
                      <span className="value">{weather.current.relative_humidity_2m}%</span>
                    </div>
                  </div>
              
                  <div className="metric">
                    <WiDust className="icon" />
                    <div className="metric-data">
                      <span className="label">Air Quality</span>
                      <span className="value" style={{ color: getAQIColor(weather.airQuality.current.us_aqi) }}>
                      {weather.airQuality.current.us_aqi} AQI
                      </span>

                      
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;