import React, { useState, useEffect } from "react";
// import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import WeatherDetails from "./components/WeatherDetails";
import "./App.css";
import axios from "axios";
import WeatherGraph from "./components/WeatherGraph";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faWind, faSun, faCloud } from "@fortawesome/free-solid-svg-icons";


const API_KEY = "33b6adc4ba435549cdf6c7dfcfa363a5";

function App() {
  const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
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

  const fetchWeatherbasedonlocation = async (lat, lon) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        setWeather(response.data);
        setForecast(forecast.data);
    } catch (error) {
        setError("Failed to fetch weather data.");
    }
};

  const fetchWeather = async (city) => {
    try {
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        setWeather(weatherData);
        setForecast(forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
  };


    return (
        <div className="App">
          <header><h1>Hitesh Forecast</h1><SearchBar onSearch={fetchWeather} /></header>
          <div className="weathercard">{weather && <WeatherCard weather={weather} />}
          {weather && <WeatherDetails weather={weather} />}</div>
            {forecast && <Forecast forecast={forecast} />}
            {weather && <WeatherGraph forecast={forecast} />}
        </div>
    );
}

export default App;

