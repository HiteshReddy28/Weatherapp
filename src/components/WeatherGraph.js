import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, 
  faTemperatureHalf, 
  faDroplet, 
  faWind, 
  faArrowsLeftRight 
} from "@fortawesome/free-solid-svg-icons";
// import "./WeatherGraph.css";

const WeatherGraph = ({ forecast }) => {
  const [dataType, setDataType] = useState("temp");
  
  // Assuming forecast contains hourly or daily data
  // Transform the data for the chart
  const prepareChartData = () => {
    if (!forecast || !forecast.list) return [];
    
    return forecast.list.slice(0, 8).map(item => {
      // Convert timestamp to readable time
      const date = new Date(item.dt * 1000);
      const timeLabel = date.getHours() + ':00';
      
      return {
        time: timeLabel,
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
        humidity: item.main.humidity,
        wind: item.wind.speed,
        icon: item.weather[0].icon,
        description: item.weather[0].description
      };
    });
  };
  
  const chartData = prepareChartData();
  
  // Get min and max values for temperature domain
  const getTemperatureDomain = () => {
    if (chartData.length === 0) return [0, 0];
    
    const minTemp = Math.min(...chartData.map(data => data.temp)) - 3;
    const maxTemp = Math.max(...chartData.map(data => data.temp)) + 3;
    
    return [Math.floor(minTemp), Math.ceil(maxTemp)];
  };
  
  // Get data type specific configurations
  const getDataTypeConfig = () => {
    switch(dataType) {
      case "temp":
        return { 
          name: "Temperature (°C)", 
          dataKey: "temp", 
          stroke: "#ff7300", 
          domain: getTemperatureDomain(),
          unit: "°C"
        };
      case "feels_like":
        return { 
          name: "Feels Like (°C)", 
          dataKey: "feels_like", 
          stroke: "#8884d8", 
          domain: getTemperatureDomain(),
          unit: "°C"
        };
      case "humidity":
        return { 
          name: "Humidity (%)", 
          dataKey: "humidity", 
          stroke: "#82ca9d", 
          domain: [0, 100],
          unit: "%"
        };
      case "wind":
        return { 
          name: "Wind Speed (m/s)", 
          dataKey: "wind", 
          stroke: "#8dd1e1", 
          domain: [0, Math.max(...chartData.map(data => data.wind)) + 2],
          unit: "m/s"
        };
      default:
        return { 
          name: "Temperature (°C)", 
          dataKey: "temp", 
          stroke: "#ff7300", 
          domain: getTemperatureDomain(),
          unit: "°C"
        };
    }
  };
  
  const config = getDataTypeConfig();
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{label}</p>
          <p className="tooltip-value">
            {config.name}: {payload[0].value}{config.unit}
          </p>
          <div className="tooltip-weather">
            <img 
              src={`http://openweathermap.org/img/wn/${data.icon}.png`} 
              alt={data.description}
            />
            <span>{data.description}</span>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="weather-graph-container">
      <div className="graph-header">
        <h3><FontAwesomeIcon icon={faChartLine} /> Weather Forecast</h3>
        <div className="data-type-selector">
          <button 
            className={dataType === "temp" ? "active" : ""} 
            onClick={() => setDataType("temp")}
          >
            <FontAwesomeIcon icon={faTemperatureHalf} /> Temp
          </button>
          <button 
            className={dataType === "feels_like" ? "active" : ""} 
            onClick={() => setDataType("feels_like")}
          >
            <FontAwesomeIcon icon={faTemperatureHalf} /> Feels Like
          </button>
          <button 
            className={dataType === "humidity" ? "active" : ""} 
            onClick={() => setDataType("humidity")}
          >
            <FontAwesomeIcon icon={faDroplet} /> Humidity
          </button>
          <button 
            className={dataType === "wind" ? "active" : ""} 
            onClick={() => setDataType("wind")}
          >
            <FontAwesomeIcon icon={faWind} /> Wind
          </button>
        </div>
      </div>
      
      <div className="graph-container">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                padding={{ left: 20, right: 20 }} 
              />
              <YAxis 
                domain={config.domain}
                tickCount={6} 
                unit={config.unit}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey={config.dataKey}
                name={config.name}
                stroke={config.stroke}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data">
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <p>No forecast data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherGraph;