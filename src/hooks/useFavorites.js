import { useState} from 'react';
import gettingCityWeather from '../data/weather_api';

function useFavorites() {
  // localStorage anahtarı
  const anahtar = 'favoriteCities';
  
  // Favori şehirlerin state'i
  const [favoriteCities, setFavoriteCities] = useState(() => {
    try {
      // localStorage'dan favori şehirleri al
      const storedCities = window.localStorage.getItem(anahtar);
      // JSON olarak parse et
      return storedCities ? JSON.parse(storedCities) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  // Favori şehir ekleme fonksiyonu
  const addFavoriteCity = (cityData) => {
    const isCityExist = favoriteCities.some(city => city.id === cityData.city.id);
  
    if (!isCityExist && favoriteCities.length < 3) {
      const newCity = {
        id: cityData.city.id,
        name: cityData.city.name,
        temperature: cityData.list[0].temp,
        description: cityData.list[0].weather[0].description,
        maxTemp: cityData.list[0].main.temp_max,
        minTemp: cityData.list[0].main.temp_min,
      };
  
      const newCities = [...favoriteCities, newCity];
      setFavoriteCities(newCities);
      window.localStorage.setItem(anahtar, JSON.stringify(newCities));
    } else if (isCityExist) {
      console.warn("Bu şehir zaten favori olarak eklenmiş.");
    } else {
      console.warn("Favori şehir limitine ulaşıldı. Daha fazla şehir ekleyemezsiniz.");
    }
  };

  // Favori şehirleri getirme fonksiyonu
  const getFavoriteCities = () => {
    return favoriteCities;
  };

  const updateFavoriteCityWeather = async (weather) => {
    const cityData = favoriteCities.find(city => city.id === weather);
    if (cityData) {
      try {
        let weatherData = await gettingCityWeather(weather.name)
        cityData.temperature = weatherData.list[0].temp;
        cityData.description= weatherData.list[0].weather[0].description;
        setFavoriteCities([...favoriteCities]);
        window.localStorage.setItem(anahtar, JSON.stringify(favoriteCities));
      } catch (error) {
        console.error("Hava durumu güncellenemedi:", error);
      }
    }
  };

  return {
    favoriteCities,
    addFavoriteCity,
    getFavoriteCities,
    updateFavoriteCityWeather
  };
}

export default useFavorites;
