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
import Sunny from '../../components/weather/Sunnym.jsx';
import Clouds from '../../components/weather/Couds.jsx';
import SunClouds from '../../components/weather/Suncouds.jsx';
import DailyForecast from '../../components/forecast/DailyForecast.jsx';
import CurrentWeather from '../../components/forecast/CurrentWeather.jsx';

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
  if (weatherCode === 0) return 'Clear';
  if (weatherCode === 1) return 'Mostly Clear';
  if (weatherCode === 2) return 'Partly Cloudy';
  if (weatherCode === 3) return 'Overcast';
  if (weatherCode >= 45 && weatherCode <= 48) return weatherCode === 48 ? 'Icy Fog' : 'Foggy';
  if (weatherCode >= 51 && weatherCode <= 55) return weatherCode === 55 ? 'Heavy Drizzle' : (weatherCode === 53 ? 'Drizzle' : 'Light Drizzle');
  if (weatherCode >= 61 && weatherCode <= 65) return weatherCode === 65 ? 'Heavy Rain' : (weatherCode === 63 ? 'Rain' : 'Light Rain');
  if (weatherCode >= 71 && weatherCode <= 77) return weatherCode === 75 ? 'Heavy Snow' : (weatherCode === 73 ? 'Snow' : (weatherCode === 77 ? 'Snow Grains' : 'Light Snow'));
  if (weatherCode >= 80 && weatherCode <= 82) return weatherCode === 82 ? 'Heavy Showers' : (weatherCode === 81 ? 'Showers' : 'Light Showers');
  if (weatherCode >= 85 && weatherCode <= 86) return weatherCode === 86 ? 'Snow Showers' : 'Light Snow Showers';
  if (weatherCode >= 95 && weatherCode <= 99) return weatherCode === 99 ? 'T-storm w/ Hail' : (weatherCode === 96 ? 'Light T-storm w/ Hail' : 'Thunderstorm');
  if (weatherCode >= 56 && weatherCode <= 67) {
    if (weatherCode === 56) return 'Light Freezing Drizzle';
    if (weatherCode === 57) return 'Freezing Drizzle';
    if (weatherCode === 66) return 'Light Freezing Rain';
    if (weatherCode === 67) return 'Freezing Rain';
  }
  return 'Cloudy';
};


const getCurrentWeatherIcon = (weatherCode) => {
  return (
    <div className="small-weather-icon">
      {weatherCode <= 1 ? <Sunny /> :
       weatherCode <= 2 ? <SunClouds /> :
       (weatherCode >= 51 && weatherCode <= 55) || 
       (weatherCode >= 61 && weatherCode <= 65) ||
       (weatherCode >= 80 && weatherCode <= 82) ? <Rainy /> :
       weatherCode >= 71 && weatherCode <= 77 ? <Rainy /> :
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
         weatherCode <= 2 ? <SunClouds /> :
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

  const getDailyHumidity = (hourlyData, index) => {
    const start = index * 24;
    const end = (index + 1) * 24;
    const dayHumidity = hourlyData.slice(start, end);
    return Math.round(dayHumidity.reduce((sum, val) => sum + val, 0) / dayHumidity.length);
  };
  
  const getDailyAQI = (hourlyData, index) => {
    const start = index * 24;
    const end = (index + 1) * 24;
    const dayAQI = hourlyData.slice(start, end).filter(val => val !== null);
    return dayAQI.length ? Math.round(dayAQI.reduce((sum, val) => sum + val, 0) / dayAQI.length) : 0;
  };


// End of functions section

function Forecast() {
  const { locationId } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airQualityForecastData, setAirQualityForecastData] = useState(null);
  const [humidityForecastData, setHumidityForecastData] = useState(null);

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

        
        const [weatherResponse, airQualityResponse, airQualityForecast, himidityForecast] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,precipitation_probability,cloudcover,uv_index,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,windspeed_10m_max,weathercode&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,visibility,apparent_temperature,weathercode&timezone=auto`),
          fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.lat}&longitude=${location.lon}&current=european_aqi,pm10,pm2_5,uv_index`),
          fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.lat}&longitude=${location.lon}&hourly=european_aqi&forecast_days=7`),
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=relative_humidity_2m&timezone=auto`)
        ]);

        const [weatherData, airQualityData, airQualityForecastData, humidityForecastData] = await Promise.all([
          weatherResponse.json(),
          airQualityResponse.json(),
          airQualityForecast.json(),
          himidityForecast.json()
        ]);

        setWeather({
          ...weatherData,
          airQuality: airQualityData,
          locationName: location.name
        });

        setAirQualityForecastData(airQualityForecastData);
        setHumidityForecastData(humidityForecastData);

        
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
          <CurrentWeather
            weather={weather}
            getAQIColor={getAQIColor}
            getCurrentWeatherIcon={getCurrentWeatherIcon}
          />

          <DailyForecast
            weather={weather}
            humidityForecastData={humidityForecastData}
            airQualityForecastData={airQualityForecastData}
            getWeatherComponent={getWeatherComponent}
            getDailyHumidity={getDailyHumidity}
            getDailyAQI={getDailyAQI}
            getAQIColor={getAQIColor}
          />
        </div>
      </div>
    </div>
  );
}

export default Forecast;