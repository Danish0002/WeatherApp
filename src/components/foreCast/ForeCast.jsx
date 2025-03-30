import { motion } from "framer-motion";
import SkeletonLoader from "../skeleton/SkeletonLoader";

const Forecast = ({ forecast, loading }) => {
  if (loading) return <SkeletonLoader />;
  if (!forecast || !forecast.list?.length) return null;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dailyForecasts = forecast.list
    .filter((item) => {
      const itemDate = new Date(item.dt * 1000);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate >= tomorrow;
    })
    .filter((item, index, self) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US");
      return index === self.findIndex((t) => new Date(t.dt * 1000).toLocaleDateString("en-US") === date);
    })
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all mt-4"
    >
      <h3 className="text-xl font-bold text-center">5-Day Forecast</h3>

      {dailyForecasts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No forecast data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
          {dailyForecasts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-md shadow-md bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-800 text-center transition-all"
            >
              <p className="font-medium">{new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
              <motion.img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="Weather icon"
                className="mx-auto w-14 h-14"
              />
              <p className="text-lg font-semibold">{Math.round(item.main.temp)}°C</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Forecast;
