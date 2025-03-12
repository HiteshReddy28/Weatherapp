import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "33b6adc4ba435549cdf6c7dfcfa363a5"; 
const WeatherApp = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherbasedonlocation(latitude, longitude);
                },
                (error) => {
                    setError("Location access denied. Enable location and refresh.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    // Function to fetch weather data
    const fetchWeatherbasedonlocation = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            setWeather(response.data);
        } catch (error) {
            setError("Failed to fetch weather data.");
        }
    };

    return (
        <div>
            <h2>Weather App</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weather ? (
                
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default WeatherApp;
