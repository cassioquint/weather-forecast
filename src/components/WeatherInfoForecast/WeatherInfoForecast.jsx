import './WeatherInfoForecast.css'

function WeatherInfoForecast({ infoForecast }) {

    let dailyForecast = {}

    for (let forecast of infoForecast.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }

    const nextFiveDays = Object.values(dailyForecast).slice(1,)

    function toWeekNameDay(date) {
        const newDate = new Date(date * 1000).toLocaleDateString('en', { weekday: 'long', day: '2-digit' })
        return newDate
    }
    return (
        <div className='forecast-container'>
            <h3>Upcoming Weather Forecast</h3>
            <div className='forecast-list'>
                {
                    nextFiveDays.map(
                        forecast => (
                            <div key={forecast.dt} className='forecast-item'>
                                <p className='forecast-day'>{toWeekNameDay(forecast.dt)}</p>
                                <img src={`weather/${forecast.weather[0].id}.png`} alt={`forecast-image-${forecast.dt}`} />
                                <p className='forecast-description'>{forecast.weather[0].description}</p>
                                <p className='forecast-min-max'>{Math.round(forecast.main.temp_min)}°C min / {Math.round(forecast.main.temp_max)}°C max</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default WeatherInfoForecast