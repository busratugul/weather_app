import { useState } from 'react'
import gettingCityWeather from '../data/weather_api'

function useLocalStorage() {
  const key = 'favoriteCities'

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : []
    } catch (error) {
      console.error(error)
      return []
    }
  })

  //Storage'a veri yükleme fonksiyonu
  const addStoredValue = (data) => {
    const isValueExist = storedValue.some(
      (item) => item.id === data.city.id
    )

    if (!isValueExist && storedValue.length < 5) {
      const newCity = {
        id: data.city.id,
        name: data.city.name,
        temperature: data.list[0].main.temp,
        description: data.list[0].weather[0].description,
        maxTemp: data.list[0].main.temp_max,
        minTemp: data.list[0].main.temp_min,
        icon: data.list[0].weather[0].icon,
      }

      const newCities = [...storedValue, newCity]
      setStoredValue(newCities)
      window.localStorage.setItem(key, JSON.stringify(newCities))
    } else if (isValueExist) {
      return {error: 'Bu şehir zaten favori olarak eklenmiş.'}
    } else {
      return {error: 'Favori şehir limitine ulaşıldı. Daha fazla şehir ekleyemezsiniz.'}
      
    }
  }

  //storagedan veri alma fonksiyonu
  const getStoredValue = () => {
    return storedValue
  }

  //storagedaki verileri güncelleme fonksiyonu
  const updateStoredValue = async (item) => {
    const data = storedValue.find((city) => city.id === item.id)
    if (data) {
      try {
        let weatherData = await gettingCityWeather(item.name)
        data.temperature = weatherData.list[0].main.temp
        data.description = weatherData.list[0].weather[0].description
        setStoredValue([...storedValue])
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        return { error: 'Hava durumu güncellenemedi:'}
      }
    }
  }

  //storagedan veri silme fonksiyonu
  const removeStoredValue = (item) => {
    const updatedCities = storedValue.filter(
      (city) => city.id !== item.id
    )
    window.localStorage.setItem(key, JSON.stringify(updatedCities))
    setStoredValue(updatedCities)
  }

  return {
    storedValue,
    addStoredValue,
    getStoredValue,
    updateStoredValue,
    removeStoredValue,
  }
}

export default useLocalStorage
