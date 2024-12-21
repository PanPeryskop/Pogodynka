import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/forecast/${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            Pogodynka
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/forecast" className="nav-link">Forecast</Link>
          </li>
          <li className="nav-item">
            <Link to="/maps" className="nav-link">Maps</Link>
          </li>
          <li className="nav-item">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;