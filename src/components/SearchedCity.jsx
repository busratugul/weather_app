import React, { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import gettingCityWeather from '../data/weather_api'
import Loading from './Loading'

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
        <h1 className="text-5xl">
          {cityWeather?.city?.name} ,
          <small className="text-base"> {cityWeather?.city?.country}</small>
        </h1>
        <p className="text-base text-slate-400">{getCurrentDate()}</p>
        <p className="capitalize">
          {cityWeather?.list[0].weather[0]?.description}
        </p>
        <article className="flex justify-evenly align-center">
          <div className="grid place-content-center gap-2 text-sm text-left pt-7">
            <p>
              Hissedilen Sıcaklık:
              <span className="ms-1">
                {Math.round(cityWeather?.list[0]?.main?.feels_like)} °C
              </span>
            </p>
            <p>
              Nem Oranı:
              <span className="ms-1">
                {cityWeather?.list[0]?.main?.humidity} %
              </span>
            </p>
            <p>
              Basınç:
              <span className="ms-1">
                {cityWeather?.list[0]?.main?.sea_level} hPa
              </span>
            </p>
            <p>
              Rüzgar Hızı:
              <span className="ms-1">
                {Math.round(cityWeather?.list[0]?.wind?.speed)} km/h
              </span>
            </p>
            <p>
              Görüş:
              <span className="ms-1">
                {Math.floor(cityWeather?.list[0]?.visibility / 1000)} km
              </span>
            </p>
            <p>
              <span>
                Y:
                <span className="ms-1">
                  {Math.round(cityWeather?.list[0]?.main?.temp_max)}
                </span>
              </span>
              <span className="ms-5">
                D:
                <span className="ms-1">
                  {Math.round(cityWeather?.list[0]?.main?.temp_min)}
                </span>
              </span>
            </p>
          </div>
          <div className="grid place-content-center">
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${cityWeather?.list[0]?.weather[0].icon}@4x.png`}
              alt="weather icons"
            />
            <h1 className="text-4xl">
              {Math.round(cityWeather?.list[0]?.main?.temp)} °C
            </h1>
          </div>
        </article>
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
