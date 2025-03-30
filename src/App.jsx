import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/searchBar/SearchBar";
import WeatherCard from "./components/weatherCard/WeatherCard";
import Forecast from "./components/foreCast/ForeCast";
import RecentSearches from "./components/recentSearch/RecentSearches";
import ThemeToggle from "./components/theme/ThemeToggle";
import Loader from "./components/loader/Loader";
import './App.css';
import HomePage from "./components/home/homePage";

const App = () => {
  const { weather, forecast, history, fetchWeather, error, loading } = useWeather();
  const [showError, setShowError] = useState(false);
  

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 800);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen w-screen overflow-auto flex flex-col lg:flex-row items-start lg:items-center justify-center 
      ${weather?.weather[0]?.main === "Clear"
        ? "bg-gradient-to-br from-yellow-200 to-orange-400"
        : weather?.weather[0]?.main === "Rain"
        ? "bg-gradient-to-br from-gray-600 to-blue-800"
        : "bg-gradient-to-br from-blue-200 to-blue-500"
      }
      dark:from-gray-900 dark:to-black p-6 md:p-8 lg:p-10 lg:gap-16`}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/3 flex flex-col gap-8 p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300">
            Weather App
          </h1>
          <ThemeToggle />
        </div>

        <SearchBar onSearch={fetchWeather} error={error} />
        <RecentSearches history={history} fetchWeather={fetchWeather} />

        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-5 left-1/2 z-50 transform -translate-x-1/2 bg-red-500 text-white text-center px-4 py-2 rounded-lg shadow-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full lg:flex-grow flex flex-col gap-8 p-6 md:p-8 lg:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        {!weather && !forecast ? (
          <HomePage /> 
        ) : (
          <>
            <WeatherCard weather={weather} loading={loading} />
            {!error && <Forecast forecast={forecast} loading={loading} />}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default App;
