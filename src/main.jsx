if (process.env.NODE_ENV === 'production') {
  console.log = function() {};
  console.warn = function() {};
  console.error = function() {};
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NavigationBar from "./components/Navigation.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
