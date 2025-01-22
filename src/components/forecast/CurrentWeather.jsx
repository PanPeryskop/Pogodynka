import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { WiWindDeg } from 'react-icons/wi';
import { Card, Text, Metric } from '@tremor/react';

export default function CurrentWeather({ weather, getAQIColor, getCurrentWeatherIcon }) {
  return (
    <motion.div
      className="forecast-current-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="weather-header">
        <div className="header-with-icon">
          <h2 id="current-we">Current Weather</h2>
          {getCurrentWeatherIcon(weather.current.weathercode)}
        </div>
        <Metric>{Math.round(weather.current.temperature_2m)}&deg;</Metric>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>24h Temperature</h3>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart
              data={weather.hourly.time.slice(0, 24).map((time, i) => ({
                time: new Date(time).getHours() + 'h',
                temp: weather.hourly.temperature_2m[i],
              }))}
            >
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
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
            <AreaChart
              data={weather.hourly.time.slice(0, 24).map((time, i) => ({
                time: new Date(time).getHours() + 'h',
                rain: weather.hourly.precipitation_probability[i],
              }))}
            >
              <defs>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
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
              <WiWindDeg
                style={{
                  transform: `rotate(${weather.current.wind_direction_10m}deg)`,
                  fontSize: '2rem',
                }}
              />
            </div>
          </div>
        </Card>
        <Card decoration="top" className="metric-card">
          <div className="metric-content">
            <Text>Air Quality</Text>
            <Metric
              style={{
                color: getAQIColor(weather.airQuality.current.european_aqi),
              }}
            >
              {weather.airQuality.current.european_aqi} AQI
            </Metric>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}