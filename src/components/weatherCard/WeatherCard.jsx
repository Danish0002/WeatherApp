import { motion } from "framer-motion";
import SkeletonLoader from "../skeleton/SkeletonLoader";

const WeatherCard = ({ weather, loading }) => {
  if (loading) return <SkeletonLoader />;
  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all mt-4 flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold">{weather.name}</h2>

      <motion.img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
        alt="Weather icon"
        className="w-28 h-28 my-4"
        animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      
      <p className="text-lg capitalize">{weather.weather[0].description}</p>
      <p className="text-3xl font-bold mt-2">{weather.main.temp}°C</p>
      
      {/* Updated Section for Larger Humidity & Wind Text */}
      <div className="flex justify-between w-full mt-4 text-lg sm:text-xl font-semibold">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💧</span>
          <p>Humidity: <span className="text-xl sm:text-2xl">{weather.main.humidity}%</span></p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌬</span>
          <p>Wind: <span className="text-xl sm:text-2xl">{weather.wind.speed} km/h</span></p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
