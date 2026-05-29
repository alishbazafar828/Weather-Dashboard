function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <h1>{weather.temperature}°C</h1>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind: {weather.wind} km/h</p>
    </div>
  );
}

export default WeatherCard;