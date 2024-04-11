import React, { createContext, useState } from 'react'
import gettingCityWeather from '../data/weather_api'
import sunSVG from '../assets/clear.png'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  /* ----------------STATES-------------------*/
  const [searchedCity, setSearchedCity] = useState('')
  const [cityWeather, setCityWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /* -------------- FUNCTIONS  -----------------*/
  //ŞEHİR ARA
  const handleSubmit = async (e) => {
    e.preventDefault()
    const weatherData = await gettingCityWeather(searchedCity)
    if (searchedCity === '') {
      setError('Lütfen Geçerli Bir Şehir İsmi Giriniz')
    } else {
      if (weatherData.error) {
        setError(weatherData.error)
        setLoading(true)
        setSearchedCity('')
        setCityWeather(null)
      } else {
        setCityWeather(weatherData)
        setLoading(false)
        setSearchedCity('')
        setError('')
      }
    }
  }

  //DATE AYARLA
  function getCurrentDate() {
    return new Date().toLocaleDateString('tr-TR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  /* ---------------- PROPS ----------------- */
  const initialStates = {
    searchedCity,
    setSearchedCity,
    handleSubmit,
    cityWeather,
    setCityWeather,
    error,
    getCurrentDate,
    loading,
    sunSVG,
  }

  return (
    <WeatherContext.Provider value={initialStates}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
