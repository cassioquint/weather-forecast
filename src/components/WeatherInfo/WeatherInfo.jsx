import './WeatherInfo.css'

function WeatherInfo({ info }) {

    return (
        <div className='weather-container'>
            <h2>{info.name}</h2>
            <div className='weather-info'>
                <img src={`/weather/${info.weather[0].id}.png`} alt={info.weather[0].descrition} />
                <p className='temperature'>{Math.round(info.main.temp)}°C</p>
            </div>

            <p className='description'>{info.weather[0].description}</p>
            
            <div className='details'>
                <p>Feels like: {Math.round(info.main.feels_like)} </p>
                <p>Humidity: {info.main.humidity}% </p>
                <p>Pressure: {info.main.pressure} </p>
            </div>
        </div>
    )
}

export default WeatherInfo