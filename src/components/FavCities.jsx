import { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import useFavorites from '../hooks/useFavorites'

function FavCities() {
  const { favOpen, setLoading } = useContext(WeatherContext)
  const { favoriteCities, updateFavoriteCityWeather } = useFavorites()

  useEffect(() => {
    if (favOpen && favoriteCities.length > 0) {
      setLoading(true)
      favoriteCities.forEach((city) => {
        updateFavoriteCityWeather(city)
      })
      setLoading(false)
    }
  }, [favOpen, favoriteCities])

  console.log(favoriteCities)
  if (favOpen && favoriteCities) {
    return (
      <section className="fade-in flex flex-col mt-5 text-2xl">
        <h1 className="text-center">Favori Şehirler</h1>
        <ul>
          {favoriteCities.map((city, idx) => (
            <li key={idx}>{city.name}</li>
          ))}
        </ul>
      </section>
    )
  }
}

export default FavCities
