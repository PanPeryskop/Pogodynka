import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/Navigation.jsx";
// import Maps from "./components/maps/Map.jsx";
import MapsPage from "./pages/maps/Maps.jsx";
import Forecast from "./pages/forecast/Forecast.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
        <main>
          <Routes>
            <Route path="/" element={
              <div className="counter-container">
                <h1 className={count > 10 ? "rainbow-text" : ""}>Counter</h1>
                <p>{count}</p>
                <div id="buttons">
                  <button onClick={() => setCount(count + 1)}>Increment</button>
                  <button onClick={() => setCount(count - 1)}>Decrement</button>
                </div>
              </div>
            } />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/forecast/:locationId" element={<Forecast />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;