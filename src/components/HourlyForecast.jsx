import React from "react";

// For Hourly forcast in iterval of 3 hour
const HourlyForecast = ({ forecast }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Next 3-Hour Intervals</h2>
      <div className="flex overflow-x-auto space-x-3 p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {forecast.map((hour, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-3 rounded-lg shadow text-center min-w-[100px]">
            <p className="text-xs font-semibold">
              {new Date(hour.dt_txt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </p>
            <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="icon" className="w-10 h-10 mx-auto" />
            <p className="text-sm font-bold">{Math.round(hour.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
