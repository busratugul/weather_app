import React, { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import gettingCityWeather from '../data/weather_api'
import Loading from './Loading'
import WeeklyWeather from './WeeklyWeather'

function Weather() {
  const { cityWeather, getCurrentDate, setCityWeather, error, loading } =
    useContext(WeatherContext)

  useEffect(() => {
    ;(async () => {
      const weatherData = await gettingCityWeather('İstanbul')
      setCityWeather(weatherData)
    })()
  }, [])

  //aranan şehir geçerli ise ve error yoksa
  if (cityWeather && error === '') {
    return (
      <section className="w-full border border-slate-800 text-center py-4 grid gap-2 mt-5">
        <h1 className="text-6xl mt-3">
          {cityWeather?.city?.name} ,
          <small className="text-base"> {cityWeather?.city?.country}</small>
        </h1>
        <p className="text-base text-slate-400">{getCurrentDate()}</p>
        <p className="capitalize">
          {cityWeather?.list[0].weather[0]?.description}
        </p>
        <article className="flex justify-evenly align-center">
          <div className="grid place-content-center">
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${cityWeather?.list[0]?.weather[0].icon}@2x.png`}
              alt="weather icons"
            />
            <h1 className="text-4xl">
              {Math.round(cityWeather?.list[0]?.main?.temp)} °C
            </h1>
          </div>
          <div className="grid place-content-center">
            <p>
              Hissedilen Sıcaklık:
              {Math.round(cityWeather?.list[0]?.main?.feels_like)} °C
            </p>
            <p>Nem Oranı: {cityWeather?.list[0]?.main?.humidity} %</p>
            <p>
              Rüzgar Hızı: {Math.round(cityWeather?.list[0]?.wind?.speed)} km/h
            </p>
            <p>
              <span>Y: {Math.round(cityWeather?.list[0]?.main?.temp_max)}</span>
              <span>D: {Math.round(cityWeather?.list[0]?.main?.temp_min)}</span>
            </p>
          </div>
        </article>

        <section className="w-full mt-3">
          <WeeklyWeather />
        </section>
      </section>
    )
  }
  //eğer hata mesajı varsa
  if (error !== '' && loading) {
    return (
      <section className="w-full border rounded border-slate-800 text-center py-10 grid gap-2 min-h-96 mt-5">
        <Loading />
      </section>
    )
  }
}

export default Weather
