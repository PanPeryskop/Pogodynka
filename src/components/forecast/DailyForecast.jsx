import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { WiStrongWind, WiRaindrops, WiHumidity, WiDust } from 'react-icons/wi';

export default function DailyForecast({
  weather,
  humidityForecastData,
  airQualityForecastData,
  getWeatherComponent,
  getDailyHumidity,
  getDailyAQI,
  getAQIColor
}) {
  return (
    <div className="daily-forecast">
      <h2 id='week-forecast'>7-Day Forecast</h2>
      <div className="forecast-grid">
        {weather.daily.time.map((date, index) => (
          <div key={date} className="day-card">
            <h3 id='day-namee'>
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
            </h3>

            <div className="weather-icon">
              {getWeatherComponent(weather.daily.weathercode[index])}
            </div>

            <div className="temperature-section">
              <div className="temp-info">
                <p className="max-temp">
                  <span className="label">Max:</span>
                  <span className="value">
                    {Math.round(weather.daily.temperature_2m_max[index])}&deg;
                  </span>
                </p>
                <p className="min-temp">
                  <span className="label">Min:</span>
                  <span className="value">
                    {Math.round(weather.daily.temperature_2m_min[index])}&deg;
                  </span>
                </p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart
                    data={weather.hourly.time
                      .slice(index * 24, (index + 1) * 24)
                      .map((time, i) => ({
                        time: new Date(time).getHours() + 'h',
                        temp: weather.hourly.temperature_2m[i + index * 24]
                      }))}
                  >
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip />
                    <Area type="monotone" dataKey="temp" stroke="#8b5cf6" fill="url(#tempGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart
                    data={weather.hourly.time
                      .slice(index * 24, (index + 1) * 24)
                      .map((time, i) => ({
                        time: new Date(time).getHours() + 'h',
                        precipitation: weather.hourly.precipitation_probability[i + index * 24]
                      }))}
                  >
                    <defs>
                      <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
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
                  <span className="value">
                    {Math.round(weather.daily.windspeed_10m_max[index])} km/h
                  </span>
                </div>
              </div>
              <div className="metric">
                <WiRaindrops className="icon" />
                <div className="metric-data">
                  <span className="label">Precipitation</span>
                  <span className="value">
                    {weather.daily.precipitation_probability_mean[index]}%
                  </span>
                </div>
              </div>
              <div className="metric">
                <WiHumidity className="icon" />
                <div className="metric-data">
                  <span className="label">Humidity</span>
                  <span className="value">
                    {getDailyHumidity(humidityForecastData.hourly.relative_humidity_2m, index)}%
                  </span>
                </div>
              </div>
              <div className="metric">
                <WiDust className="icon" />
                <div className="metric-data">
                  <span className="label">Air Quality</span>
                  <span
                    className="value"
                    style={{
                      color: getAQIColor(
                        getDailyAQI(airQualityForecastData.hourly.european_aqi, index)
                      )
                    }}
                  >
                    {getDailyAQI(airQualityForecastData.hourly.european_aqi, index)} AQI
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}