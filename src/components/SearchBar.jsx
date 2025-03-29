
import React, { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";

// In this search city , add recent and delete recent 

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [recentCities, setRecentCities] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(null);

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(storedCities);
  }, []);

  const handleSearch = () => {
    if (city.trim() === "") return;
    onSearch(city);
    updateRecentCities(city);
    setCity("");
  };

  const updateRecentCities = (newCity) => {
    let updatedCities = [newCity, ...recentCities.filter((c) => c !== newCity)].slice(0, 5);
    setRecentCities(updatedCities);
    localStorage.setItem("recentCities", JSON.stringify(updatedCities));
  };

  const removeRecentCity = (cityToRemove) => {
    const updatedCities = recentCities.filter((c) => c !== cityToRemove);
    setRecentCities(updatedCities);
    localStorage.setItem("recentCities", JSON.stringify(updatedCities));
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      
      {/* Search Input with Icon */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search city..."
          className="w-full p-3 pl-10 text-lg rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
      </div>

      {/* Search Button */}
      <button 
        onClick={handleSearch} 
        className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 text-lg rounded-xl transition"
      >
        Search
      </button>

      {/* Recent Searches */}
      {recentCities.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 justify-center my-2">
          {recentCities.map((c, index) => (
            <div 
              key={index} 
              className="relative flex items-center bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-3xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
              onMouseEnter={() => setHoveredCity(c)} 
              onMouseLeave={() => setHoveredCity(null)}
            >
              <button onClick={() => onSearch(c)} className="text-lg font-medium">{c}</button>

              {/* Trash Icon Appears on Hover */}
              {hoveredCity === c && (
                <button 
                  onClick={() => removeRecentCity(c)} 
                  className="absolute -right-3 -top-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-transform transform scale-90 hover:scale-100"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
