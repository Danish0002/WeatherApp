import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.WEATHER_APP_API_KEY;

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError("Please enter a valid city.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      updateHistory(city);
      await fetchForecast(city);
    } catch (err) {
      setError("City not found. Try again.");
      setWeather(null);
    }
    setLoading(false);
  };

  const fetchForecast = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecast(res.data);
    } catch (err) {
      setForecast(null);
    }
  };

  const updateHistory = (city) => {
    setHistory((prev) => {
      const newHistory = [city, ...prev.filter((c) => c !== city)].slice(0, 5);
      localStorage.setItem("history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return { weather, forecast, history, loading, error, fetchWeather };
};
