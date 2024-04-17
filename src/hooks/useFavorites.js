import { useContext, useState} from 'react';
import gettingCityWeather from '../data/weather_api';
import WeatherContext from '../context/WeatherContext';

function useFavorites() {
  const key = 'favoriteCities';
  const {setError} = useContext(WeatherContext)
  
  const [favoriteCities, setFavoriteCities] = useState(() => {
    try {
      const storedCities = window.localStorage.getItem(key)
      return storedCities ? JSON.parse(storedCities) : []
    } catch (error) {
      console.error(error)
      return []
    }
  })

  const addFavoriteCity = (cityData) => {
    const isCityExist = favoriteCities.some(city => city.id === cityData.city.id)
  
    if (!isCityExist && favoriteCities.length < 10) {
      const newCity = {
        id: cityData.city.id,
        name: cityData.city.name,
        temperature: cityData.list[0].main.temp,
        description: cityData.list[0].weather[0].description,
        maxTemp: cityData.list[0].main.temp_max,
        minTemp: cityData.list[0].main.temp_min,
        icon: cityData.list[0].weather[0].icon
      }
  
      const newCities = [...favoriteCities, newCity]
      setFavoriteCities(newCities)
      window.localStorage.setItem(key, JSON.stringify(newCities))
    } else if (isCityExist) {
      setError("Bu şehir zaten favori olarak eklenmiş.")
    } else {
      setError("Favori şehir limitine ulaşıldı. Daha fazla şehir ekleyemezsiniz.")
    }
  }

  // Favori şehirleri getirme fonksiyonu
  const getFavoriteCities = () => {
    return favoriteCities
  }

  const updateFavoriteCityWeather = async (weather) => {
    const cityData = favoriteCities.find(city => city.id === weather)
    if (cityData) {
      try {
        let weatherData = await gettingCityWeather(weather.name)
        cityData.temperature = weatherData.list[0].temp;
        cityData.description= weatherData.list[0].weather[0].description;
        setFavoriteCities([...favoriteCities]);
        window.localStorage.setItem(key, JSON.stringify(favoriteCities));
      } catch (error) {
        console.error("Hava durumu güncellenemedi:", error)
      }
    }
  }

  return {
    favoriteCities,
    addFavoriteCity,
    getFavoriteCities,
    updateFavoriteCityWeather
  }
}

export default useFavorites
