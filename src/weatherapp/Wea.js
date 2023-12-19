import React, { useState } from 'react';
import SearchIcon from '../assets/search.png';
import ClearIcon from '../assets/clear.png';
import CloudIcon from '../assets/cloud.png';
import DrizzleIcon from '../assets/drizzle.png';
import RainIcon from '../assets/rain.png';
import SnowIcon from '../assets/snow.png';
import humidityicon from'../assets/humidity.png';
import windicon from'../assets/wind.png';

import './w.css';

const WeatherIcons = {
  '01d': ClearIcon,
  '01n': ClearIcon,
  '02d': RainIcon,
  '02n': RainIcon,
  '03d': DrizzleIcon,
  '03n': DrizzleIcon,
  '04d': SnowIcon,
  '04n': SnowIcon,
  '09d': CloudIcon,
  '09n': CloudIcon,
  '10d': RainIcon,
  '10n': RainIcon,
  '13d': SnowIcon,
  '13n': SnowIcon,
};

const W = () => {
  const api_key = 'c6bea8d24e96c7dde232926a28aa21fd';
  const [mainIcon, setMainIcon] = useState(SnowIcon);
  const [weatherData, setWeatherData] = useState({
    humidity: '75%',
    windSpeed: '14 KM/H',
    temperature: '-69°C',
    cityName: 'sahira',
    weatherIcon: '',
  });
  const [cityNameInput, setCityNameInput] = useState('');

  const search = async (cityName) => {
    if (!cityName) {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const parsedResponse = await response.json();

      setWeatherData({
        humidity: `${parsedResponse.main.humidity}%`,
        windSpeed: `${parsedResponse.wind.speed} km/h`,
        temperature: `${parsedResponse.main.temp}°C`,
        cityName: parsedResponse.name,
        weatherIcon: parsedResponse.weather[0].icon,
      });

      if (WeatherIcons.hasOwnProperty(parsedResponse.weather[0].icon)) {
        setMainIcon(WeatherIcons[parsedResponse.weather[0].icon]);
      } else {
        setMainIcon(SnowIcon);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setCityNameInput(event.target.value);
  };

  const handleSearch = () => {
    search(cityNameInput);
  };

  return (
    <div className='container'>
        <div className="top-bar">
        <input
        type="text"
        className="inputcityname"
        value={cityNameInput}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
          <div className="search-icon" onClick={handleSearch}>
            <img src={SearchIcon} alt="search-icon" />
          </div>
        </div>
        <div className="middle-part">
        <div className="middle-image">
          <img src={mainIcon} alt="cloud" />
        </div>
        <div className="degree">
        {weatherData.temperature}
        </div>
        <div className="city-name">{weatherData.cityName}</div>  
     </div>
     <div className="footer">
     <div className="humidity">
     <div className="hu-wi-icon">
        <img src={humidityicon} alt="humidity" />
      </div>
      <div className="weather-value">
       <div className="humi-pers">
       {weatherData.humidity}
      </div>
      <div className="humidity-letter">
         HUMIDITY
      </div>
      </div>
     </div>
      <div className="wind">
      <div className="hu-wi-icon">
        <img src={windicon} alt="humidity" />
      </div>
      <div className="weather-value">
        <div className="humi-pers-wind">
        {weatherData.windSpeed}
        </div>
      <div className="humidity-letter">
         WIND SPEED
      </div>
      </div>
      </div>
     </div>
    </div>
  );
};

export default W;