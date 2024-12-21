import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from 'react-icons/wi';
import { MdLocationOn, MdSearch, MdMap, MdAir } from 'react-icons/md';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Metric, Text } from "@tremor/react";
import './Mpage.css';

function Mpage() {
  const [mainSearch, setMainSearch] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const popularCities = [
    { name: 'London', coords: { lat: 51.5074, lon: -0.1278 } },
    { name: 'Paris', coords: { lat: 48.8566, lon: 2.3522 } },
    { name: 'New York', coords: { lat: 40.7128, lon: -74.0060 } },
    { name: 'Tokyo', coords: { lat: 35.6762, lon: 139.6503 } },
    { name: 'Sydney', coords: { lat: -33.8688, lon: 151.2093 } },
    { name: 'Dubai', coords: { lat: 25.2048, lon: 55.2708 } }
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const weatherPromises = popularCities.map(async (city) => {
          const [weatherResponse, airQualityResponse] = await Promise.all([
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.coords.lat}&longitude=${city.coords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&current=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto`
            ),
            fetch(
              `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.coords.lat}&longitude=${city.coords.lon}&current=us_aqi,pm10,pm2_5`
            )
          ]);

          const [weatherData, airData] = await Promise.all([
            weatherResponse.json(),
            airQualityResponse.json()
          ]);

          return {
            city: city.name,
            coords: `${city.coords.lat},${city.coords.lon}`,
            current: {
              temp: weatherData.current.temperature_2m,
              humidity: weatherData.current.relativehumidity_2m,
              wind: weatherData.current.windspeed_10m,
              aqi: airData.current.us_aqi,
              pm10: airData.current.pm10,
              pm25: airData.current.pm2_5
            },
            daily: weatherData.daily.time.map((date, i) => ({
              date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
              temp: weatherData.daily.temperature_2m_max[i],
              rain: weatherData.daily.precipitation_probability_mean[i]
            }))
          };
        });

        const results = await Promise.all(weatherPromises);
        setCitiesData(results);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (mainSearch.trim()) {
      navigate(`/forecast/${mainSearch}`);
      setMainSearch('');
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#22c55e';
    if (aqi <= 100) return '#eab308';
    if (aqi <= 150) return '#f97316';
    return '#ef4444';
  };

  if (loading) return <div className="loading">Loading weather data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="main-page">
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-wrapper">
            <MdSearch className="search-icon" />
            <input
              type="text"
              id="main-search-input"
              placeholder="Search location..."
              value={mainSearch}
              onChange={(e) => setMainSearch(e.target.value)}
            />
          </div>
          <motion.button
            type="button"
            className="map-button"
            onClick={() => navigate('/maps')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MdMap /> Open Map
          </motion.button>
        </form>
      </div>

      <div className="cities-grid">
        {citiesData.map((city, index) => (
          <motion.div
            key={city.city}
            className="city-card"
            onClick={() => navigate(`/forecast/${city.coords}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="city-header">
              <h2>{city.city}</h2>
              <Metric>{Math.round(city.current.temp)}°C</Metric>
            </div>

            <div className="charts">
              <div className="chart-container">
                <h3>Temperature</h3>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={city.daily}>
                    <defs>
                      <linearGradient id={`temp${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{fontSize: 12}} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="#8b5cf6"
                      fill={`url(#temp${index})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>Precipitation</h3>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={city.daily}>
                    <defs>
                      <linearGradient id={`rain${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{fontSize: 12}} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="rain"
                      stroke="#22c55e"
                      fill={`url(#rain${index})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="city-details">
              <Card>
                <Text>Humidity</Text>
                <Metric>{Math.round(city.current.humidity)}%</Metric>
              </Card>
              <Card>
                <Text>Wind</Text>
                <Metric>{Math.round(city.current.wind)} km/h</Metric>
              </Card>
              <Card>
                <Text>Air Quality</Text>
                <Metric style={{ color: getAQIColor(city.current.aqi) }}>
                  {Math.round(city.current.aqi)} AQI
                </Metric>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Mpage;