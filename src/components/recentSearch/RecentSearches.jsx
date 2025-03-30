const RecentSearches = ({ history, fetchWeather }) => {
  return (
    <div className="mt-6">

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Recent Searches:
      </h3>


      <div className="flex flex-wrap gap-2 mt-2">
        {history.map((city, index) => (
          <button
            key={index}
            onClick={() => fetchWeather(city)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all
                      bg-gray-200 text-gray-800 hover:bg-gray-300
                      dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
