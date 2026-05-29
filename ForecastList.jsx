function ForecastList({ forecast }) {
  return (
    <div className="forecast">
      <h3>7-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p>{day.maxTemp}° / {day.minTemp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;