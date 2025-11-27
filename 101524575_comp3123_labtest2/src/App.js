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

// WeatherDisplay component that displays the weather information (specifically the city name, weather icon, temperature, and short description)
function WeatherDisplay({ weather }) {
  return (
    <div>
      {/* display the weather data in "city, country" format */}
      <h2>{weather.name}, {weather.sys.country}</h2>
      
      {/* styling to make sure the icon is shown next to the temperature instead of above/below */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center' }}>
        {/* doing this lets the icon shown next to the weather information dynamically change depending on the weather condition */}
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="dynamic weather icon"
        />
        <div>
          {/* display the temperature in Celsius*/}
          <h1>{Math.round(weather.main.temp)}°C</h1>
          {/* display the short description of the weather condition */}
          <p>{weather.weather[0].description}</p>
        </div>
      </div>

      {/* display additional weather information along with their proper units */}
      <div style={{ marginTop: '20px' }}>
        <p><strong>Feels Like:</strong> {Math.round(weather.main.feels_like)}°C</p>
        <p><strong>Low (Min Temperature):</strong> {Math.round(weather.main.temp_min)}°C</p>
        <p><strong>High (Max Temperature):</strong> {Math.round(weather.main.temp_max)}°C</p>
        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
        <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        <p><strong>Wind Direction:</strong> {weather.wind.deg}°</p>
        {/* convert the visibility from meters to kilometers for better UI*/}
        <p><strong>Visibility:</strong> {(weather.visibility / 1000).toFixed(1)} km</p>
        <p><strong>Coordinates:</strong> Lat {weather.coord.lat}°, Lon {weather.coord.lon}°</p>
        <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        <p><strong>City ID:</strong> {weather.id}</p>
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