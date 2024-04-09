import React, { createContext, useState } from 'react'
import gettingCityWeather from '../data/weather_api'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  //STATES
  const [searchedCity, setSearchedCity] = useState('')
  const [cityWeather, setCityWeather] = useState(null)
  const [error, setError] = useState('')

  //FUNCTIONS
  //Şehir arama fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault()
    const weatherData = await gettingCityWeather(searchedCity)
    if (weatherData.error) {
      setError(weatherData.error)
      setCityWeather(null)
    } else {
      setCityWeather(weatherData)
      setSearchedCity('')
      setError('')
    }
  }

  //
  function getCurrentDate() {
    return new Date().toLocaleDateString('tr-TR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  //context propları
  const initialStates = {
    searchedCity,
    setSearchedCity,
    handleSubmit,
    cityWeather,
    error,
    getCurrentDate,
  }
  return (
    <WeatherContext.Provider value={initialStates}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
