import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSun, 
  faCloud, 
  faCloudRain, 
  faCloudShowersHeavy, 
  faSnowflake, 
  faBolt, 
  faSmog
} from "@fortawesome/free-solid-svg-icons";

const Forecast = ({ forecast }) => {
    // Get one forecast per day at 12:00
    const dailyForecasts = forecast.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
    );

    // Function to get the appropriate weather icon
    const getWeatherIcon = (code) => {
        if (code >= 200 && code < 300) return faBolt; // Thunderstorm
        if (code >= 300 && code < 400) return faCloudRain; // Drizzle
        if (code >= 500 && code < 600) return faCloudShowersHeavy; // Rain
        if (code >= 600 && code < 700) return faSnowflake; // Snow
        if (code >= 700 && code < 800) return faSmog; // Atmosphere (fog, mist)
        if (code === 800) return faSun; // Clear sky
        if (code > 800) return faCloud; // Clouds
        return faSun; // Default
    };

    // Function to format the date more nicely
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="forecast-container">
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="forecast-items">
                {dailyForecasts.map((day, index) => (
                    <div key={index} className="forecast-item">
                        <div className="forecast-date">{formatDate(day.dt)}</div>
                        <div className="forecast-icon">
                            <FontAwesomeIcon 
                                icon={getWeatherIcon(day.weather[0].id)} 
                                size="2x" 
                            />
                        </div>
                        <div className="forecast-temp">{Math.round(day.main.temp)}°C</div>
                        <div className="forecast-desc">{day.weather[0].description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;