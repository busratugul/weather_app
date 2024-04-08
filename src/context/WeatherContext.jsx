import React, { createContext, useState } from 'react'
import gettingCityWeather from '../data/weather_api'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  //STATES
  const [searchedCity, setSearchedCity] = useState('')

  //FUNCTIONS
  //Şehir arama fonksiyonu
  function handleSubmit(e) {
    e.preventDefault()
    gettingCityWeather(searchedCity)
    setSearchedCity('')
  }

  //context propları
  const initialStates = {
    searchedCity,
    setSearchedCity,
    handleSubmit,
  }

  return (
    <WeatherContext.Provider value={initialStates}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
