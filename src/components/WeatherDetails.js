import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSun, 
  faMoon, 
  faCompass, 
  faGauge, 
  faCloudRain,
  faEye,
  faDroplet
} from "@fortawesome/free-solid-svg-icons";

const WeatherDetails = ({ weather }) => {
    // Function to format time
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Function to determine wind direction
    const getWindDirection = (degrees) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    return (
        <div className="weather-details-card">
            <h3 className="details-title">Weather Details</h3>
            
            <div className="details-grid">
                <div className="details-item">
                    <div className="details-icon">
                        <FontAwesomeIcon icon={faSun} />
                    </div>
                    <div className="details-content">
                        <div className="details-label">Sunrise</div>
                        <div className="details-value">{formatTime(weather.sys.sunrise)}</div>
                    </div>
                </div>
                
                <div className="details-item">
                    <div className="details-icon">
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                    <div className="details-content">
                        <div className="details-label">Sunset</div>
                        <div className="details-value">{formatTime(weather.sys.sunset)}</div>
                    </div>
                </div>
                
                <div className="details-item">
                    <div className="details-icon">
                        <FontAwesomeIcon icon={faCompass} />
                    </div>
                    <div className="details-content">
                        <div className="details-label">Wind Direction</div>
                        <div className="details-value">{weather.wind.deg}° ({getWindDirection(weather.wind.deg)})</div>
                    </div>
                </div>
                
                <div className="details-item">
                    <div className="details-icon">
                        <FontAwesomeIcon icon={faGauge} />
                    </div>
                    <div className="details-content">
                        <div className="details-label">Pressure</div>
                        <div className="details-value">{weather.main.pressure} hPa</div>
                    </div>
                </div>
                
                {weather.main.humidity && (
                    <div className="details-item">
                        <div className="details-icon">
                            <FontAwesomeIcon icon={faDroplet} />
                        </div>
                        <div className="details-content">
                            <div className="details-label">Humidity</div>
                            <div className="details-value">{weather.main.humidity}%</div>
                        </div>
                    </div>
                )}
                
                {weather.visibility && (
                    <div className="details-item">
                        <div className="details-icon">
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                        <div className="details-content">
                            <div className="details-label">Visibility</div>
                            <div className="details-value">{(weather.visibility / 1000).toFixed(1)} km</div>
                        </div>
                    </div>
                )}
                
                {weather.rain && weather.rain['1h'] && (
                    <div className="details-item">
                        <div className="details-icon">
                            <FontAwesomeIcon icon={faCloudRain} />
                        </div>
                        <div className="details-content">
                            <div className="details-label">Rainfall (1h)</div>
                            <div className="details-value">{weather.rain['1h']} mm</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherDetails;