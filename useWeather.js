import { useState, useCallback } from 'react';

const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("City not found");

      const { latitude, longitude } = geoData.results[0];

      // Get weather data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      const weatherData = await weatherRes.json();

      setCurrentWeather({
        city: geoData.results[0].name,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
      });

      setForecast(
        weatherData.daily.time.map((date, i) => ({
          date,
          maxTemp: weatherData.daily.temperature_2m_max[i],
          minTemp: weatherData.daily.temperature_2m_min[i],
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { currentWeather, forecast, loading, error, fetchWeather };
};

export default useWeather;