import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/current?city=${location}&key=0c236f072c75485788319fdc7c0e51f8`
        );
        const data = await response.json();
        const [weatherData] = data.data;
        setTemperature(weatherData.temp);
        setDescription(weatherData.weather.description);
        setIcon(weatherData.weather.icon);
      } catch (error) {
        console.error(error);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=0c236f072c75485788319fdc7c0e51f8`
        );
        const data = await response.json();
        const forecastData = data.data.slice(1, 6); // Get forecast data for next 5 days
        setForecast(forecastData);
      } catch (error) {
        console.error(error);
      }
    };

    if (location) {
      fetchForecastData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Enter a city:
          <input type="text" value={location} onChange={handleLocationChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {temperature && (
        <div className="weather-info">
          <div className="current-weather">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}
              alt={description}
            />
            <div className="temperature">{temperature}°C</div>
            <div className="description">{description}</div>
          </div>
          <div className="forecast">
            {forecast.map((day) => (
              <div className="forecast-item" key={day.datetime}>
                <div className="day">{new Date(day.datetime).toLocaleDateString()}</div>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                  alt={day.weather.description}
                />
                <div className="temperature">
                  {day.min_temp}°C / {day.max_temp}°C
                </div>
                <div className="description">{day.weather.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
