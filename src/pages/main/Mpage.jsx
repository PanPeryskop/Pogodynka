import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from 'react-icons/wi';
import { MdLocationOn, MdSearch, MdMap, MdAir } from 'react-icons/md';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Metric, Text } from "@tremor/react";
import './Mpage.css';
import Loader from '../../components/Loading.jsx';
import Clouds from '../../components/weather/Couds.jsx';
import Rainy from '../../components/weather/Rain.jsx';
import Sunny from '../../components/weather/Sunnym.jsx';
import SunClouds from '../../components/weather/Suncouds.jsx';
import Switch from '../../components/Switch.jsx';


function Mpage() {
  const [mainSearch, setMainSearch] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGradients, setShowGradients] = useState(() => 
    JSON.parse(localStorage.getItem('showGradients') ?? 'true')
  );
  const navigate = useNavigate();

  const toggleGradients = () => {
    const newValue = !showGradients;
    setShowGradients(newValue);
    localStorage.setItem('showGradients', JSON.stringify(newValue));
  };

  function getBackgroundGradient(weatherCode) {
    if (showGradients) return 'rgba(255, 255, 255, 0.05)'; 
    
    const gradients = {
      clear: 'linear-gradient(45deg, rgba(167, 139, 250, 0.25) 0%, rgba(253, 186, 116, 0.15) 50%, rgba(167, 139, 250, 0.25) 100%)',
      partlyCloudy: 'linear-gradient(45deg, rgba(167, 139, 250, 0.2) 0%, rgba(203, 213, 225, 0.15) 50%, rgba(167, 139, 250, 0.2) 100%)',
      cloudy: 'linear-gradient(45deg, rgba(148, 163, 184, 0.2) 0%, rgba(71, 85, 105, 0.15) 50%, rgba(148, 163, 184, 0.2) 100%)',
      foggy: 'linear-gradient(45deg, rgba(203, 213, 225, 0.2) 0%, rgba(100, 116, 139, 0.15) 50%, rgba(203, 213, 225, 0.2) 100%)',
      drizzle: 'linear-gradient(45deg, rgba(147, 197, 253, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(147, 197, 253, 0.2) 100%)',
      rain: 'linear-gradient(45deg, rgba(96, 165, 250, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(96, 165, 250, 0.2) 100%)',
      snow: 'linear-gradient(45deg, rgba(226, 232, 240, 0.25) 0%, rgba(147, 197, 253, 0.15) 50%, rgba(226, 232, 240, 0.25) 100%)',
      thunderstorm: 'linear-gradient(45deg, rgba(139, 92, 246, 0.25) 0%, rgba(88, 28, 135, 0.2) 50%, rgba(139, 92, 246, 0.25) 100%)'
    };

    document.documentElement.style.setProperty('--weather-transition', '1.5s');

    if (weatherCode === 0) return gradients.clear;
    if (weatherCode === 1) return gradients.partlyCloudy;
    if (weatherCode === 2) return gradients.partlyCloudy;
    if (weatherCode === 3) return gradients.cloudy;
    if (weatherCode >= 45 && weatherCode <= 48) return gradients.foggy;
    if (weatherCode >= 51 && weatherCode <= 55) return gradients.drizzle;
    if (weatherCode >= 56 && weatherCode <= 57 || weatherCode >= 66 && weatherCode <= 67) return gradients.rain;
    if (weatherCode >= 61 && weatherCode <= 65) return gradients.rain;
    if (weatherCode >= 71 && weatherCode <= 77) return gradients.snow;
    if (weatherCode >= 80 && weatherCode <= 82) return gradients.rain;
    if (weatherCode >= 85 && weatherCode <= 86) return gradients.snow;
    if (weatherCode >= 95 && weatherCode <= 99) return gradients.thunderstorm;
    
    return gradients.clear;
  }

  const popularCities = [
    { name: 'London', coords: { lat: 51.5085, lon: -0.1257 } },
    { name: 'Paris', coords: { lat: 48.8566, lon: 2.3522 } },
    { name: 'New York', coords: { lat: 40.7128, lon: -74.0060 } },
    { name: 'Tokyo', coords: { lat: 35.4122, lon: 139.4130 } },
    { name: 'Sydney', coords: { lat: -33.8688, lon: 151.2093 } },
    { name: 'Warsaw', coords: { lat: 52.2297, lon: 21.0122 } }
  ];

  
    const getCurrentWeatherIcon = (weatherCode) => {
    return (
      <div className="main-small-weather-icon">
        {
          weatherCode === 0 ? <Sunny /> :
          weatherCode === 1 ? <Sunny /> :
          weatherCode === 2 ? <SunClouds /> :
          weatherCode === 3 ? <Clouds /> :
          weatherCode >= 45 && weatherCode <= 48 ? <Clouds /> :
          weatherCode >= 51 && weatherCode <= 57 ? <Rainy /> :
          (weatherCode >= 61 && weatherCode <= 67) ? <Rainy /> :
          weatherCode >= 71 && weatherCode <= 77 ? <Rainy /> :
          weatherCode >= 80 && weatherCode <= 82 ? <Rainy /> :
          weatherCode >= 85 && weatherCode <= 86 ? <Rainy /> :
          weatherCode >= 95 && weatherCode <= 99 ? <Rainy /> :
          <Clouds />
        }
      </div>
    );
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const weatherPromises = popularCities.map(async (city) => {
            const [weatherResponse, airQualityResponse] = await Promise.all([
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.coords.lat}&longitude=${city.coords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&current=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode&timezone=auto`
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
              weathercode: weatherData.current.weathercode, // Add this
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

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="main-page">
      <div className="main-search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="main-search-wrapper">
            <MdSearch className="main-search-icon" />
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
            className="main-map-button"
            onClick={() => navigate('/maps')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MdMap /> Open Map
          </motion.button>
          <Switch
            checked={showGradients}
            onChange={toggleGradients}
          />
        </form>
      </div>

      <div className="main-cities-grid">
        {citiesData.map((city, index) => (
          <motion.div
            key={city.city}
            className="main-city-card"
            onClick={() => navigate(`/forecast/${city.coords}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            style={{ background: getBackgroundGradient(city.current.weathercode) }}
          >
          <div className="main-city-header">
            <h2>{city.city}</h2>
            {getCurrentWeatherIcon(city.current.weathercode)}
            
            <Metric>{Math.round(city.current.temp)}°C</Metric>
          </div>

            <div className="main-charts">
              <div className="main-chart-container">
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

            <div className="main-city-details">
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