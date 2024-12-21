import './Navigation.css';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          Pogodynka
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/forecast" className="nav-link">Forecast</a>
          </li>
          <li className="nav-item">
            <Link to="/maps" className="nav-link">Maps</Link>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;