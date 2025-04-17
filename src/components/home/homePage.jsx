import React from "react";

const HomePage = () => {
  return (
    <div
      className="relative flex items-center justify-center h-[80vh] bg-center overflow-hidden rounded-4xl"
      style={{
        backgroundImage: 'url("/danish.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 backdrop-blur-md p-6 sm:p-8 px-4 sm:px-8 rounded-4xl border-4 border-white hover:border-blue-300 shadow-xl text-center w-full max-w-md transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-24 h-24 mb-6 rounded-full mx-auto shadow-xl border-4 border-white transition-all duration-300 hover:border-blue-500"
        />
        <p className="text-lg text-blue-300 dark:text-gray-300 mb-4">
          Search for a location to get the weather forecast.
        </p>
        <p className="text-2xl font-bold text-blue-300 dark:text-gray-100">
          Weather App by Danish
        </p>
      </div>
    </div>
  );
};

export default HomePage;
