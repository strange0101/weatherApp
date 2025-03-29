import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { ClipLoader, PulseLoader } from "react-spinners";
import ForecastCard from "./components/ForecastCard";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./contextApi/ThemeContext";
import { RefreshCcw } from "lucide-react"; 

const API_KEY = "9fef95dda2b7ba8fa9bdba40c0f04c23";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async (city) => {
    if (!city.trim()) return;
    if (!/^[a-zA-Z\s]+$/.test(city)) {
      setError("❌ Invalid city name. Use only letters!");

      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);
    setHourlyForecast([]);
    setCurrentCity(city);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      processForecastData(forecastResponse.data);
      processHourlyForecast(forecastResponse.data);
    } catch (err) {
      setError("❌ City not found or API error. Try again!");
    }
    setLoading(false);
  };

  const processForecastData = (data) => {
    const dailyForecast = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      const time = item.dt_txt.split(" ")[1];
      if (time === "12:00:00") {
        dailyForecast[date] = item;
      }
    });
    setForecast(Object.values(dailyForecast).slice(0, 5));
  };

  const processHourlyForecast = (data) => {
    const nextHours = data.list.slice(0, 8); // Next 24 hours (3-hour intervals)
    setHourlyForecast(nextHours);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchWeather(currentCity);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ThemeProvider>
      <div className="p-6 max-w-lg mx-auto bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-all">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">🌦️ Weather Dashboard</h1>
          <ThemeToggle />
        </div>

        <SearchBar onSearch={fetchWeather} />

        {loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-4"
          >
            <ClipLoader color="#2563EB" size={50} />
          </motion.div>
        ) : error ? (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        ) : weather ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherCard weather={weather} />
            </motion.div>

            {/* Refresh Button with Spinner */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {refreshing ? <PulseLoader color="white" size={6} /> : <RefreshCcw size={18} />}
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {/* 5-Day Forecast */}
            {forecast.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold mt-4">📅 5-Day Forecast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  {forecast.map((day, index) => (
                    <ForecastCard key={index} day={day} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3-Hour Forecast */}
            {hourlyForecast.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold mt-4">⏳ 3-Hour Forecast</h2>
                <div className="flex gap-3 mt-3 overflow-x-auto snap-x snap-mandatory p-2 scroll-smooth 
                     scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 dark:scrollbar-thumb-blue-400 
                     dark:scrollbar-track-gray-700 rounded-lg">
                  {hourlyForecast.map((hour, index) => (
                    <div key={index} className="snap-center">
                      <ForecastCard day={hour} showTime />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default App;
