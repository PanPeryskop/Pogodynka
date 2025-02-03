<div align="center">

# 🌦️ Pogodynka - Weather Forecast App

<div class="weather-universe" style="
    position: relative;
    height: 600px;
    background: radial-gradient(circle at center, #0a0f2e, #1a1a4d);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 100px rgba(0,82,163,0.3);
">
    <div class="earth" style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 40%, 
            #3a5ba0 0%,
            #1a4580 30%,
            #0d2c4d 70%,
            #091c33 100%
        );
        transform: translate(-50%, -50%);
        box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
    ">
        <div style="
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                45deg,
                transparent 0 5px,
                rgba(255,255,255,0.05) 5px 10px
            );
            border-radius: 50%;
            animation: earth-rotate 40s linear infinite;
        "></div>
    </div>
    <div class="sun-orbit" style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        transform: translate(-50%, -50%) rotateZ(20deg);
        animation: orbit 40s linear infinite;
    ">
        <div class="sun" style="
            position: absolute;
            right: -20px;
            top: 50%;
            width: 50px;
            height: 50px;
            background: radial-gradient(#ffd700, #ff4500);
            border-radius: 50%;
            box-shadow: 0 0 100px #ff8c00;
            transform: translateY(-50%);
            animation: sun-glow 3s ease-in-out infinite;
        "></div>
    </div>
    <div class="moon-orbit" style="
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        transform: translate(-50%, -50%) rotateZ(-15deg);
        animation: orbit 30s linear infinite reverse;
    ">
        <div class="moon" style="
            position: absolute;
            left: -20px;
            bottom: 50%;
            width: 35px;
            height: 35px;
            background: linear-gradient(45deg, #d3d3d3, #808080);
            border-radius: 50%;
            box-shadow: 
                inset 0 0 20px rgba(0,0,0,0.3),
                0 0 50px rgba(255,255,255,0.1);
            animation: moon-phase 30s linear infinite;
        "></div>
    </div>
    <div class="weather-system" style="
        position: absolute;
        width: 100%;
        height: 100%;
    ">        <div class="cloud-layer" style="
            position: absolute;
            width: 150%;
            height: 200px;
            background: repeating-linear-gradient(
                45deg,
                transparent 0 50px,
                rgba(255,255,255,0.1) 50px 100px
            );
            animation: clouds 40s linear infinite;
            filter: blur(3px);
            opacity: 0.8;
            top: 30%;
        "></div>
        <div class="storm" style="
            position: absolute;
            width: 100%;
            height: 100%;
            animation: storm-cycle 40s infinite;
        ">
            <div class="lightning" style="
                position: absolute;
                width: 3px;
                height: 50px;
                background: linear-gradient(to bottom, #fff 50%, #89f7fe);
                clip-path: polygon(50% 0%, 80% 100%, 20% 100%);
                opacity: 0;
                filter: blur(1px);
                animation: lightning 2s infinite;
            "></div>
        </div>
        <div class="rain" style="
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                90deg,
                transparent 0 2px,
                rgba(255,255,255,0.3) 2px 4px
            );
            opacity: 0;
            animation: rain 5s linear infinite;
            pointer-events: none;
        "></div>
    </div>
    <h1 style="
        position: relative;
        z-index: 10;
        text-align: center;
        font-size: 4rem;
        color: transparent;
        background: linear-gradient(90deg, #fff, #89f7fe, #66a6ff);
        -webkit-background-clip: text;
        background-clip: text;
        text-shadow: 0 0 30px rgba(102,166,255,0.5);
        padding: 2rem;
        margin: 0;
    ">Pogodynka</h1>
    <div style="
        position: absolute;
        bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 1rem;
        z-index: 10;
    ">
        <a href="http://pogodynka.almeron.online">
            <img src="https://img.shields.io/badge/Live%20Preview-success?style=for-the-badge" alt="Live Preview">
        </a>
        <a href="https://reactjs.org/">
            <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React">
        </a>
        <a href="LICENSE">
            <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
        </a>
    </div>
    <style>
        @keyframes orbit {
            from { transform: translate(-50%, -50%) rotateZ(0deg); }
            to { transform: translate(-50%, -50%) rotateZ(360deg); }
        }
        @keyframes earth-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes sun-glow {
            0%, 100% { box-shadow: 0 0 80px #ff8c00; }
            50% { box-shadow: 0 0 120px #ff4500; }
        }
        @keyframes moon-phase {
            0% { clip-path: inset(0 50% 0 0); }
            50% { clip-path: inset(0 0 0 50%); }
            100% { clip-path: inset(0 50% 0 0); }
        }
        @keyframes clouds {
            from { transform: translateX(-50%); }
            to { transform: translateX(0%); }
        }
        @keyframes rain {
            0% { opacity: 0; transform: translateY(-100%); }
            50% { opacity: 0.6; }
            100% { opacity: 0; transform: translateY(100%); }
        }
        @keyframes lightning {
            0%, 95% { opacity: 0; }
            96%, 97% { opacity: 1; transform: scaleY(2); }
            98%, 100% { opacity: 0; }
        }
        @keyframes storm-cycle {
            0%, 80% { opacity: 0; }
            85%, 90% { opacity: 1; }
            95%, 100% { opacity: 0; }
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
