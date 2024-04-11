import React, { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import gettingCityWeather from '../data/weather_api'

function Weather() {
  const { cityWeather, getCurrentDate, setCityWeather } =
    useContext(WeatherContext)

  useEffect(() => {
    ;(async () => {
      const weatherData = await gettingCityWeather('İstanbul')
      setCityWeather(weatherData)
    })()
  }, [])

  if (cityWeather) {
    return (
      <section className="w-3/5 border border-slate-800 text-center py-4 grid gap-2">
        <h1 className="text-7xl">
          {cityWeather?.city?.name} ,{' '}
          <small className="text-base"> {cityWeather?.city?.country}</small>
        </h1>
        <p className="text-base text-slate-400">{getCurrentDate()}</p>
        <p className="capitalize">{cityWeather?.list[0].weather[0]?.description}</p>
        <article>
          <div className="w-full">
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${cityWeather?.list[0]?.weather[0].icon}@4x.png`}
              alt="weather icons"
            />
          </div>
          <h1 className="text-4xl">{Math.round(cityWeather?.list[0]?.main?.temp)} °C</h1>
        </article>
        <article className='grid gap-2 mt-3'>
          <p>
            Hissedilen Sıcaklık: {Math.round(cityWeather?.list[0]?.main?.feels_like)} °C
          </p>
          <p>Nem Oranı: {cityWeather?.list[0]?.main?.humidity} %</p>
          <p>Rüzgar Hızı: {Math.round(cityWeather?.list[0]?.wind?.speed)} km/h </p>
          <p>
            <span>Y: {Math.round(cityWeather?.list[0]?.main?.temp_max)}</span>
            <span>D: {Math.round(cityWeather?.list[0]?.main?.temp_min)}</span>
          </p>
        </article>
      </section>
    )
  }
}

export default Weather
