<div align="center">

# 🌦️ Pogodynka - Weather Forecast App

<div class="weather-container" style="
    position: relative;
    overflow: hidden;
    min-height: 600px;
    background: linear-gradient(120deg, #0a2a43, #1b5068, #3d1b4a);
    border-radius: 20px;
    box-shadow: 0 32px 64px rgba(0,0,0,0.3);
    perspective: 1000px;
">
        <div class="sky-animation" style="
        position: absolute;
        width: 400%;
        height: 100%;
        background: linear-gradient(
            90deg,
            #0a2a43 0%,
            #1b5068 25%,
            #ffd700 50%,
            #1b5068 75%,
            #0a2a43 100%
        );
        animation: sky 30s linear infinite;
        opacity: 0.4;
        mix-blend-mode: soft-light;
    "></div>
    <div class="celestial-body" style="
        position: absolute;
        left: -100px;
        top: 50%;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ffd700, #ff8c00);
        box-shadow: 0 0 80px rgba(255,215,0,0.5);
        animation: sun-path 30s linear infinite;
        z-index: 2;
    "></div>
    <div class="celestial-body" style="
        position: absolute;
        left: -100px;
        top: 50%;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: linear-gradient(45deg, #f0f0f0, #c0c0c0);
        box-shadow: 
            inset 5px 5px 15px rgba(0,0,0,0.2),
            0 0 50px rgba(255,255,255,0.2);
        animation: moon-path 30s linear infinite;
        opacity: 0;
        z-index: 1;
    "></div>
    <div class="weather-effects">
        <div class="cloud" style="
            position: absolute;
            width: 200px;
            height: 80px;
            background: rgba(255,255,255,0.1);
            border-radius: 50px;
            top: 30%;
            left: -200px;
            animation: cloud-drift 20s linear infinite;
            backdrop-filter: blur(10px);
        ">
            <div class="lightning" style="
                position: absolute;
                width: 10px;
                height: 40px;
                background: yellow;
                clip-path: polygon(50% 0%, 80% 100%, 20% 100%);
                left: 45%;
                top: 90%;
                opacity: 0;
                animation: lightning 15s infinite;
            "></div>
        </div>
        <div class="rain" style="
            position: absolute;
            width: 100%;
            height: 100%;
            animation: rain 7.5s linear infinite;
            opacity: 0;
        ">
        </div>
    </div>
    <h1 class="title" style="
        position: relative;
        z-index: 3;
        font-size: 4rem;
        text-align: center;
        padding: 2rem;
        background: linear-gradient(90deg, #fff, #89f7fe, #66a6ff);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 0 30px rgba(102,166,255,0.4);
        animation: title-glow 3s ease-in-out infinite;
    ">Pogodynka</h1>
    <div style="
        position: absolute;
        bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 1rem;
        z-index: 4;
    ">
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
        @keyframes sky {
            0% { transform: translateX(-75%); }
            100% { transform: translateX(0%); }
        }
        @keyframes sun-path {
            0% { transform: translate(0, 100px) scale(0.8); opacity: 0; }
            25% { transform: translate(25vw, -100px) scale(1.2); opacity: 1; }
            50% { transform: translate(50vw, 100px) scale(0.8); opacity: 0; }
            75%, 100% { transform: translate(100vw, -100px); opacity: 0; }
        }
        @keyframes moon-path {
            0%, 50% { transform: translate(0, 100px) scale(0.8); opacity: 0; }
            75% { transform: translate(25vw, -100px) scale(1.1); opacity: 1; }
            100% { transform: translate(50vw, 100px) scale(0.8); opacity: 0; }
        }
        @keyframes cloud-drift {
            0% { transform: translateX(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes rain {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { 
                opacity: 0;
                background: repeating-linear-gradient(90deg,
                    transparent 0 2px,
                    rgba(255,255,255,0.3) 2px 4px
                );
            }
        }
        @keyframes lightning {
            0%, 95% { opacity: 0; }
            96%, 97% { opacity: 1; }
            98%, 100% { opacity: 0; }
        }
        @keyframes title-glow {
            0%, 100% { text-shadow: 0 0 30px rgba(102,166,255,0.4); }
            50% { text-shadow: 0 0 50px rgba(102,166,255,0.8), 0 0 30px rgba(255,255,255,0.6); }
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

