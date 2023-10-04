import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const WeatherApp = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState("");

  function changeHandler(event) {
    setCity(event.target.value);
    console.log(city);
  }

  // Fetching data after the user submits the form eliminates unessesary API calls 

  function submitHandler(event) {
    event.preventDefault(); 
    if (city) {
        fetch(api_url)
          .then((response) => response.json())
          .then((data) => setWeather(data))
          .catch((error) => console.log(error));
      }  
    }

  // configure weather API
  const api_key = "075ded7d31addeef3034fff7af4e5bdf";
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


// Fetching data with useEffect happens on every keystroke - too many API calls

//   let typingTimeout;

//   useEffect(() => {
//     // Clear previous timeout
//     clearTimeout(typingTimeout);

//     // Set a new timeout to fetch data after a delay
//     typingTimeout = setTimeout(() => {
//       if (city) {
//         fetch(api_url)
//           .then((response) => response.json())
//           .then((data) => setWeather(data))
//           .catch((error) => console.log(error));
//       }
//     }, 100); // Adjust the delay as needed
//   }, [city]);

  console.log(weather);

  const fTemperature = Math.round(1.8 * (weather.main.temp - 273.15) + 32)

  return (
    <div className="weather-app">
      <form onSubmit={submitHandler}>
        <input
          id="city"
          value={city}
          type="text"
          onChange={changeHandler}
          placeholder="Enter a city"
        />
        <button type="submit">
          <FontAwesomeIcon className="search" icon={faMagnifyingGlass} />
        </button>
      </form>

        {weather && <div className="weather-data">
            <p>{fTemperature}&#176;<sup>F</sup></p>
            <h1>{weather.name}</h1>

        </div>}
    </div>
  );
};

export default WeatherApp;
