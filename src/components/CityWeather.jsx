import React, { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'

function CityWeather() {
  //contexten gerekli proplar alındı
  const { searchedCity, setSearchedCity, handleSubmit, error } =
    useContext(WeatherContext)
  return (
    <section className="h-100 grid w-full place-items-start">
      <article className="flex flex-col items-center mx-auto">
        <p className="text-sm text-slate-400 mb-2">
          Hava durumu bilgisi için bir şehir girin.
        </p>
        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Şehir Ara"
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
            className="w-full px-3 py-1 rounded placeholder:text-slate-400 bg-gray-700 border-none outline-none text-lg"
          />
          {error !== '' && (
            <div>
              <p className="text-red-500 mt-2 text-xs text-center">{error}</p>
            </div>
          )}
        </form>
      </article>
    </section>
  )
}

export default CityWeather
