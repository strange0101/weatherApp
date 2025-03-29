
import React from 'react';
import { motion } from 'framer-motion';

// weather Card for showing full weather data 

const WeatherCard = ({ weather }) => {
  return (
    <motion.div
      className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center">{weather.name}, {weather.sys.country}</h2>

      {/* Weather Icon */}
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
        alt="weather icon" 
        className="w-28 h-28"
      />

      {/* Temperature */}
      <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
      <p className="text-lg capitalize">{weather.weather[0].description}</p>

      {/* Additional Weather Details */}
      <div className="grid grid-cols-2 gap-4 mt-3 text-center">
        <p className="text-sm">🌡 Feels Like: <br /><span className="text-lg font-semibold">{Math.round(weather.main.feels_like)}°C</span></p>
        <p className="text-sm">💧 Humidity: <br /><span className="text-lg font-semibold">{weather.main.humidity}%</span></p>
        <p className="text-sm">🌬 Wind Speed: <br /><span className="text-lg font-semibold">{weather.wind.speed} km/h</span></p>
        <p className="text-sm">📏 Pressure: <br /><span className="text-lg font-semibold">{weather.main.pressure} hPa</span></p>
      </div>
    </motion.div>
  );
};

export default WeatherCard;

