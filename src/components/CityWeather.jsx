import React, { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'

function CityWeather() {
  //contexten gerekli proplar alındı
  const { searchedCity, setSearchedCity, handleSubmit, error } =
    useContext(WeatherContext)
  return (
    <section className="h-100 grid w-full place-items-start pt-4">
      <article className="flex flex-col items-center gap-2 mx-auto">
        <h3>iWeather'a Hoşgeldiniz</h3>
        <p className="text-sm text-slate-400">
          Hava durumu bilgisi için bir şehir girin.
        </p>
        <form className="w-full mt-4" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Şehir Ara"
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
            className="w-full px-3 py-1 rounded placeholder:text-slate-400 bg-gray-700 border-none outline-none"
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
