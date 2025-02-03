<div align="center">

# 🌦️ Pogodynka - Weather Forecast App

  <div class="weather-header" style="
    background: linear-gradient(45deg, #00214d, #006494, #00214d);
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  ">
    <h1 style="
      font-size: 3.5rem;
      background: linear-gradient(to right, #fff, #74b9ff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: float 3s ease-in-out infinite;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    ">
      🌦️ Pogodynka
    </h1>
    <div class="weather-icons" style="
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
    ">
      <div class="sun" style="
        width: 50px;
        height: 50px;
        background: #ffd700;
        border-radius: 50%;
        box-shadow: 0 0 50px #ffd700;
        animation: pulse 2s ease-in-out infinite;
      "></div>
      <div class="cloud" style="
        width: 100px;
        height: 40px;
        background: #fff;
        border-radius: 20px;
        position: relative;
        animation: float 3s ease-in-out infinite;
      ">
        <div style="
          content: '';
          position: absolute;
          width: 50px;
          height: 50px;
          background: #fff;
          border-radius: 50%;
          top: -20px;
          left: 15px;
        "></div>
      </div>
    </div>
    <div style="margin-top: 1rem; text-align: center;">
    <a href="http://pogodynka.almeron.online">
        <img src="https://img.shields.io/badge/Live%20Preview-success?style=for-the-badge" alt="Live Preview" />
    </a>
    <a href="https://reactjs.org/">
        <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
    </a>
    </div>
    <style>
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
    </style>
  </div>
  <style>
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 0.8; }
    }
  </style>
</div>

_An elegant weather forecast application with interactive maps and real-time data visualization_

<hr />

</div>

<details>
<summary>🎯 Features</summary>

### Core Features

- 🌡️ **Real-time Weather Data**
  - Current temperature
  - Humidity levels
  - Wind speed & direction with dynamic compass
  - Air quality index (European AQI)
- 📊 **Advanced Data Visualization**

  - Interactive charts powered by Recharts
  - Precipitation forecasts
  - Temperature trends
  - Customizable timeframes

- 🗺️ **Interactive Map Integration**

  - Click-to-forecast anywhere
  - Custom location markers
  - Smooth zoom controls
  - Built-in location search

- 🎨 **Dynamic UI Elements**
  - Weather-based animated backgrounds
  - Smooth transitions
  - Responsive design
  - Dark/Light mode switch

</details>

<details>
<summary>⚡ Quick Start</summary>

```bash
# Clone repository
git clone https://github.com/yourusername/pogodynka.git

# Install dependencies
npm install

# Start development server
npm start
```

</details>

<details>
<summary>🔧 Tech Stack</summary>

| Category | Technologies         |
| -------- | -------------------- |
| Frontend | React, Framer Motion |
| Mapping  | Leaflet              |
| Charts   | Recharts             |
| Styling  | Styled Components    |
| API      | Open Meteo           |

</details>

<details>
<summary>📦 APIs Used</summary>

```javascript
const APIs = {
  weather: "Open Meteo Weather API",
  airQuality: "Open Meteo Air Quality API",
  geolocation: "IP Geolocation API",
  geocoding: "Open Meteo Geocoding API",
};
```

</details>

## 🌟 Features Showcase

<details>
<summary>📱 Responsive Design</summary>
<img src="responsive.gif" alt="Responsive Demo">
</details>

<details>
<summary>🌈 Weather Animations</summary>
<img src="animations.gif" alt="Weather Animations">
</details>
