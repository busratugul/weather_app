import React, { useContext } from 'react'
import WeatherContext from '../context/WeatherContext'

function Weather() {
  const { cityWeather } = useContext(WeatherContext)
  if (cityWeather) {
    return (
      <section>
        <h1>
          {cityWeather?.name}, <small>{cityWeather?.sys?.country}</small>
        </h1>
        <p>tarih ve saat gelicek</p>
        <p>{cityWeather?.weather[0]?.description}</p>
        <article>
          <div>icon gelicek</div>
          <h1>{Math.round(cityWeather?.main?.temp)} °C</h1>
        </article>
        <article>
          <p>
            Hissedilen Sıcaklık: {Math.round(cityWeather?.main?.feels_like)} °C
          </p>
          <p>Nem Oranı: {cityWeather?.main?.humidity} %</p>
          <p>Rüzgar Hızı: {Math.round(cityWeather?.wind?.speed)} km/h </p>
        </article>
      </section>
    )
  }
}
export default Weather
