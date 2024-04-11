import React, { useContext, useEffect, useMemo } from 'react'
import WeatherContext from '../context/WeatherContext'

function DailyWeatherDetail() {
  const { cityWeather, monthsList } = useContext(WeatherContext)

  const DailyWeatherDetail = useMemo(() => {
    if (cityWeather?.list) {
      console.log('Veri Detayları kaydedildi')
      return cityWeather.list.slice(1, 15)
    }
  }, [cityWeather])

  if (cityWeather) {
    return (
      <>
        <h1 className="mt-2 mb-3 text-center text-amber-300 tracking-wider text-lg">
           Hava Durumu Detayları
        </h1>
        <section className="w-full mt-3 overflow-x-auto gap-4">
          <div className="flex">
            {DailyWeatherDetail.map((day, idx) => (
              <div
                key={idx}
                className="border border-slate-800 text-center flex-shrink-0 w-27 mr-2 p-4 shadow-md bg-gray-700 rounded"
              >
                <p className="text-sm">
                  <span className="mr-1">{day?.dt_txt.substring(8, 10)}</span>
                  <span>
                    {monthsList[parseInt(day?.dt_txt.substring(5, 7) - 1)]}
                  </span>
                </p>
                <p>{day?.dt_txt.substring(11, 16)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`}
                  className="m-0 p-0 w-20"
                />
                <p className="capitalize">{day?.weather[0].description}</p>
                <p>{Math.round(day?.main?.temp)} °C </p>
              </div>
            ))}
          </div>
        </section>
      </>
    )
  }
}

export default DailyWeatherDetail
