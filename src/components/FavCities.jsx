import { useContext, useEffect, useState } from 'react'
import WeatherContext from '../context/WeatherContext'
import useFavorites from '../hooks/useFavorites'
import FavCity from './FavCity'

function FavCities() {
  const { favOpen, txtColor } = useContext(WeatherContext)
  const { favoriteCities, updateFavoriteCityWeather } = useFavorites()

  useEffect(() => {
    if (favOpen && favoriteCities.length > 0) {
      favoriteCities.forEach((city) => {
        updateFavoriteCityWeather(city)
      })
    }
  }, [favOpen])
  console.log(favoriteCities)

  if (favOpen) {
    return (
      <section className="w-full min-h-80 fade-in pb-5 text-2xl border-t border-slate-600">
        {favoriteCities.length > 0 ? (
          <>
            <h1
              className={`font-semibold text-center my-5 ${
                txtColor ? txtColor : 'text-slate-300'
              }`}
            >
              Favori Şehirler
            </h1>
            <ul className="w-4/5 mx-auto">
              {favoriteCities.map((city, idx) => (
                <FavCity key={idx} city={city} />
              ))}
            </ul>
          </>
        ) : (
          <div className='w-full h-full grid place-items-center'>
            <p className='text-gray-700'>Favori Şehriniz Bulunmamaktadır.</p>
          </div>
        )}
      </section>
    )
  }
}

export default FavCities
