// imports
import React, { useState, useEffect } from 'react';
import './App.css';

// SearchBar area component that contains the search field and search button
function SearchBar({ onSearch }) {
  // state for the search input. it is empty by default and updated when the user types into the input field
  const [city, setCity] = useState('');

  // function that handles what happens when the user clicks the search button
  function handleSearch() {
    // call the onSearch function ONLY if the city field is not empty
    if (city !== '') {
      // if not empty, pass the city name to the onSearch function
      onSearch(city);
      // after calling, reset the city field to an empty string to clear the input field
      setCity('');
    }
  }

  // renders the search bar area (search field and button)
  return (
    <div>
      <input
        type="text"
        value={city}
        // updates the state variable for city whenever changes are made to the input field
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name here"
      />
      <button onClick={handleSearch}>
        Click to Search
      </button>
    </div>
  );
}

// WeatherDisplay component that displays the weather information
function WeatherDisplay({ weather }) {
  // array of weather details to be displayed in a grid layout
  // label the emoji/text, value is the actual data value
  const weatherDetails = [
    { label: '🌡️ Feels Like', value: `${Math.round(weather.main.feels_like)}°C` },
    { label: '📉 Low', value: `${Math.round(weather.main.temp_min)}°C` },
    { label: '📈 High', value: `${Math.round(weather.main.temp_max)}°C` },
    { label: '💧 Humidity', value: `${weather.main.humidity}%` },
    { label: '🔽 Pressure', value: `${weather.main.pressure} hPa` },
    { label: '☁️ Cloudiness', value: `${weather.clouds.all}%` },
    { label: '💨 Wind Speed', value: `${weather.wind.speed} m/s` },
    { label: '🧭 Wind Direction', value: `${weather.wind.deg}°` },
    { label: '👁️ Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km` },
    { label: '📍 Coordinates', value: `${weather.coord.lat}°, ${weather.coord.lon}°` },
    { label: '🌅 Sunrise', value: new Date(weather.sys.sunrise * 1000).toLocaleTimeString() },
    { label: '🌇 Sunset', value: new Date(weather.sys.sunset * 1000).toLocaleTimeString() }
  ];

  return (
    <div>
      {/* display the weather data in "city, country" format */}
      <h2>{weather.name}, {weather.sys.country}</h2>
      
      {/* styling to make sure the icon is shown next to the temperature instead of above/below */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="dynamic weather icon"
          />
          <div>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>

        {/* detailed weather information with grid layout */}
        <div style={{
          borderRadius: '20px',
          border: '2px solid #e0e0e0',
          padding: '20px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
          }}>
            {/* place each weather detail in a grid cell */}  
            {weatherDetails.map((detail, index) => (
              <div key={index} style={{
                padding: '10px',
                backgroundColor: '#bde7ff',
                borderRadius: '10px',
              }}>
                {/* display the label and value within each grid cell */}
                <div>{detail.label}</div>
                <div>{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main WeatherApp component that contains both the SearchBar and WeatherDisplay components
function WeatherApp() {
  // state for the weather data to be filled from the OpenWeatherMap API
  const [weather, setWeather] = useState(null);

  // OpenWeatherMap API key 
  const API_KEY = 'e1127d177ceb159793b0102984f470c0';

  // function used to fetch the weather data using the OpenWeatherMap API
  function getWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
    // convert the response to JSON format
      .then(response => response.json())
      // if the request is successful
      .then(data => {
        // update the weather state variable with the data from the API
        setWeather(data);
      })
      // if the request fails
      .catch(error => {
        // log the error in console 
        console.log('Error fetching weather:', error);

      });
  }

  // by default, fetch weather data for Toronto
  useEffect(() => {
    getWeather('Toronto');
  }, []);

  // render the WeatherApp component
  return (
    // styling to center the content to the middle of the page
    <div style={{   
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      }}>

      <h1> Weather App</h1>
      
      {/* onSearch function is passed as a prop to the SearchBar component for rendering */}
      <SearchBar onSearch={getWeather} />

      {/* weather data is passed as a prop to the WeatherDisplay component for rendering */}
      {/* only renders the WeatherDisplay component if weather data is available */}
      {weather && weather.main && (
        <WeatherDisplay weather={weather} />
      )}

      <br></br>
      <br></br>
      <br></br>

      <h4>COMP3123 Lab Test 2 -Woohyuk (Harry) Song | 101524575</h4>
    </div>
  );
}

// export the WeatherApp component to the react app
export default WeatherApp;