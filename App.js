import { useState, useContext } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import useWeather from './hooks/useWeather';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

function AppContent() {
  const { theme } = useContext(ThemeContext);
  const [city, setCity] = useState("London");
  const { currentWeather, forecast, loading, error, fetchWeather } = useWeather();

  const handleSearch = (newCity) => {
    setCity(newCity);
    fetchWeather(newCity);
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        
        {loading && <p className="loading">Loading weather...</p>}
        {error && <p className="error">{error}</p>}

        <WeatherCard weather={currentWeather} />
        <ForecastList forecast={forecast} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;