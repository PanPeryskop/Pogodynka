import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import LogoAnimated from './Logo';

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
        <div 
          // className="nav-logo" 
          onClick={() => navigate('/')}
        >
          <LogoAnimated />
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
              <div className="search-wrapper">
                <MdSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;