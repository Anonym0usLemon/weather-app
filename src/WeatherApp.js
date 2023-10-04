import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const WeatherApp = () => {
    const [city, setCity] = useState(null); 
    const [weather, setWeather] = useState(); 

    function changeHandler(event) {
        setCity(event.target.value); 
        console.log(city); 
    }

    // configure weather API
    const api_key  = "075ded7d31addeef3034fff7af4e5bdf";
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    useEffect(() => {
        fetch(api_url)
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.log(error));
    }, [city]);

    console.log(weather); 

    return (
        <>
            <form>
                <input id="city" type="text" onChange={changeHandler} placeholder="Enter a city"/>
                <FontAwesomeIcon className="search" icon={faMagnifyingGlass} />            
            </form>
        </>
    );
}

export default WeatherApp