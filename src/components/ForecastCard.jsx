
const ForecastCard = ({ day, showTime = false }) => {
  const { main, weather, dt_txt } = day;
  const { temp } = main;
  const { icon, description } = weather[0];

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const date = new Date(dt_txt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = new Date(dt_txt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md w-32 text-center">
      <p className="text-sm font-semibold">{date}</p>
      {showTime && <p className="text-xs font-medium">{time}</p>}
      <img src={iconUrl} alt={description} className="w-14 h-14 mx-auto" />
      <p className="text-lg font-bold">{Math.round(temp)}°C</p>
      <p className="text-xs capitalize">{description}</p>
    </div>
  );
};

export default ForecastCard;
