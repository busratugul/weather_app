import { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import useFavorites from '../hooks/useFavorites'
import FavCity from './FavCity'

function FavCities() {
  const { favOpen, txtColor } = useContext(WeatherContext)
  const { favoriteCities, updateFavoriteCityWeather} = useFavorites()

  useEffect(() => {
    if (favOpen && favoriteCities.length > 0) {
      favoriteCities.forEach((city) => {
        updateFavoriteCityWeather(city)
      })
    }
  }, [favOpen, favoriteCities])

  console.log(favoriteCities)
  if (favOpen && favoriteCities) {
    return (
      <section className="w-full fade-in pb-5 text-2xl border-t border-slate-600">
        <h1 className={`text-center my-5 ${txtColor ?txtColor :"text-slate-300"}`}>Favori Şehirler</h1>
        <ul className='w-4/5 mx-auto'>
          {favoriteCities.map((city, idx) => (
            <FavCity key={idx} city={city}/>
          ))}
        </ul>
      </section>
    )
  }
}

export default FavCities
