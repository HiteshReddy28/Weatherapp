import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLocationDot, 
  faWind, 
  faSun, 
  faCloud, 
  faCloudRain, 
  faCloudShowersHeavy, 
  faSnowflake, 
  faBolt, 
  faSmog,
  faDroplet,
  faTemperatureHigh,
  faTemperatureLow,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import "./WeatherCard.css";

const WeatherCard = ({ weather }) => {
  // Function to determine which weather icon to display based on weather condition code
  const getWeatherIcon = (code) => {
    // Weather condition codes from OpenWeatherMap API
    if (code >= 200 && code < 300) return faBolt; // Thunderstorm
    if (code >= 300 && code < 400) return faCloudRain; // Drizzle
    if (code >= 500 && code < 600) return faCloudShowersHeavy; // Rain
    if (code >= 600 && code < 700) return faSnowflake; // Snow
    if (code >= 700 && code < 800) return faSmog; // Atmosphere (fog, mist)
    if (code === 800) return faSun; // Clear sky
    if (code > 800) return faCloud; // Clouds
    return faSun; // Default
  };

  // Get the appropriate icon for current weather
  const weatherIcon = getWeatherIcon(weather.weather[0].id);
  
  // Function to classify weather condition type for styling
  const getWeatherConditionType = (code) => {
    if (code >= 200 && code < 300) return "storm";
    if (code >= 300 && code < 600) return "rain";
    if (code >= 600 && code < 700) return "snow";
    if (code >= 700 && code < 800) return "atmosphere";
    if (code === 800) return "clear";
    if (code > 800) return "clouds";
    return "clear";
  };

  return (
    <div className="weather-card" data-condition={getWeatherConditionType(weather.weather[0].id)}>
      <div className="location">
        <h2>
          <FontAwesomeIcon icon={faLocationDot} />
          {weather.name}, {weather.sys.country}
        </h2>
      </div>
      
      <div className="main-info">
        <FontAwesomeIcon icon={weatherIcon} />
        <div>
          <p className="temperature">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="description">
            {weather.weather[0].description}
          </p>
        </div>
      </div>
      
      <div className="feels-like">
        <FontAwesomeIcon icon={weather.main.feels_like > weather.main.temp ? faTemperatureHigh : faTemperatureLow} />
        Feels like {Math.round(weather.main.feels_like)}°C
      </div>
      
      <div className="details">
        <div className="detail-item">
          <FontAwesomeIcon icon={faDroplet} />
          <span>Humidity: {weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faWind} />
          <span>Wind: {weather.wind.speed} m/s</span>
        </div>
        {weather.visibility && (
          <div className="detail-item">
            <FontAwesomeIcon icon={faEye} />
            <span>Visibility: {(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
        )}
        {weather.main.pressure && (
          <div className="detail-item">
            <FontAwesomeIcon icon={faCloud} />
            <span>Pressure: {weather.main.pressure} hPa</span>
          </div>
        )}
      </div>
      
      <div className="timestamp">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default WeatherCard;