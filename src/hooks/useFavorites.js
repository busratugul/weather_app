import { useContext, useEffect, useState} from 'react';
import gettingCityWeather from '../data/weather_api';
import WeatherContext from '../context/WeatherContext';

function useFavorites() {
  const key = 'favoriteCities';
  const {setError, setNotification} = useContext(WeatherContext)

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
  
    if (!isCityExist && favoriteCities.length < 3) {
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
      setNotification({
        content: `${cityData.city?.name} Favori Listenize Eklendi.`,
        visible: true
      })
      window.localStorage.setItem(key, JSON.stringify(newCities))
    } else if (isCityExist) {
      setError("Bu şehir zaten favori olarak eklenmiş.")
    } else {
      setError("Favori şehir limitine ulaşıldı. Daha fazla şehir ekleyemezsiniz.")
    }
  }

  const getFavoriteCities = () => {
    return favoriteCities
  }

  const updateFavoriteCityWeather = async (weather) => {
    const cityData = favoriteCities.find(city => city.id === weather.id)
    if (cityData) {
      try {
        let weatherData = await gettingCityWeather(weather.name)
        cityData.temperature = weatherData.list[0].main.temp;
        cityData.description= weatherData.list[0].weather[0].description;
        setFavoriteCities([...favoriteCities]);
        window.localStorage.setItem(key, JSON.stringify(favoriteCities));
        setNotification({
          content: "Hava Durumları Güncellendi.",
          visible: true
        })
      } catch (error) {
        console.error("Hava durumu güncellenemedi:", error)
      }
    }
  }

  const removeFavoriteCity = (cityData) => {
    const updatedCities = favoriteCities.filter(city => city.id !== cityData.id)
    window.localStorage.setItem(key, JSON.stringify(updatedCities))
    setFavoriteCities(updatedCities)
    setNotification({
      content: `${cityData.name} Favori Listenizden Kaldırıldı.`,
      visible: true
    })
  }

  return {
    favoriteCities,
    addFavoriteCity,
    getFavoriteCities,
    updateFavoriteCityWeather,
    removeFavoriteCity
  }
}

export default useFavorites
