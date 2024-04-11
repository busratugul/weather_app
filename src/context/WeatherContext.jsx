import React, { createContext, useState } from 'react'
import gettingCityWeather from '../data/weather_api'
import sunSVG from '../assets/clear.png'
import gettingBackgroundImg from '../data/background_api'
import bgColorIconNumber from '../data/background_color'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  /* ----------------STATES-------------------*/
  const [searchedCity, setSearchedCity] = useState('')
  const [cityWeather, setCityWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [bgImgURL, setBgImgURL] = useState('')
  const [bgColor, setBgColor] = useState("bg-slate-800")

  const monthsList = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ]

  /* -------------- FUNCTIONS  -----------------*/
  //ŞEHİR ARA
  const handleSubmit = async (e) => {
    e.preventDefault()
    const bgUrl = await gettingBackgroundImg(searchedCity)

    const weatherData = await gettingCityWeather(searchedCity)

    if (searchedCity === '' || bgUrl === '') {
      setError('Lütfen Geçerli Bir Şehir İsmi Giriniz')
    } else {
      if (weatherData.error) {
        setError(weatherData.error)
        setLoading(true)
        setSearchedCity('')
        setBgImgURL('')
        setCityWeather(null)
      } else {
         
      const dataBgColor = bgColorIconNumber(
        weatherData?.list[0]?.weather[0]?.icon
      )
        setCityWeather(weatherData)
        setBgImgURL(bgUrl)
        setBgColor(dataBgColor)
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
    monthsList,
    bgImgURL,
    setBgImgURL,
    bgColor,
    setBgColor
  }

  return (
    <WeatherContext.Provider value={initialStates}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
