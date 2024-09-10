import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import WeatherInfoForecast from './components/WeatherInfoForecast/WeatherInfoForecast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [info, setInfo] = useState()
  const [infoForecast, setInfoForecast] = useState()
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [hasError, setHasError] = useState(false)
  const inputRef = useRef()

  async function searchCity(cityName) {

    const city = cityName || inputRef.current.value.trim();

    if (!city) {
      setHasError(true)
      return;
    }
    setHasError(false)
    const key = import.meta.env.VITE_API_KEY
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=en&units=metric`
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=en&units=metric`

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(urlWeather),
        axios.get(urlForecast)
      ]);
      setInfo(weatherResponse.data);
      setInfoForecast(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch data. Please check the city name or try again later.");
      inputRef.current.value = ''
    }
  }

  function handleButtonClick() {
    setIsButtonClicked(true);
    searchCity();

    setTimeout(() => {
      setIsButtonClicked(false);
    }, 100);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  }

  useEffect(() => {
    searchCity('São Paulo')
  }, []);

  return (
    <>
      <div className='container'>
        <h1>Cloudy with a Chance</h1>
        <div className='form-wrapper'>
          <div className={`input-wrapper ${hasError ? 'wrapper-error' : ''}`}>
            <FontAwesomeIcon icon={faLocationDot} />
            <input
              className={hasError ? 'input-error' : ''}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Ex.: São Paulo"
            />
          </div>
          <button className={isButtonClicked ? 'button-clicked' : ''} onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            &nbsp;Search
          </button>
        </div>
        {info && <WeatherInfo info={info} />}
        {infoForecast && <WeatherInfoForecast infoForecast={infoForecast} />}
      </div>
    </>
  )
}

export default App
