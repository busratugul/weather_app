import { createContext, useState } from 'react'
import gettingCityWeather from '../data/weather_api'
import sunSVG from '../assets/clear.png'
import gettingBackgroundImg from '../data/background_api'
import bgColorIconNumber from '../data/background_color'
import getLocationCity from '../data/location_api'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  /* ----------------STATES-------------------*/
  const [searchedCity, setSearchedCity] = useState('')
  const [cityWeather, setCityWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [bgImgURL, setBgImgURL] = useState('')
  const [bgColor, setBgColor] = useState('bg-slate-800')
  const [permission, setPermission] = useState(false)

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
    setBgImgURL('')
    let bgUrl = await gettingBackgroundImg(searchedCity)

    let weatherData = await gettingCityWeather(searchedCity)

    if (searchedCity === '' || bgUrl === '') {
      setError('Lütfen Geçerli Bir Şehir İsmi Giriniz')
      setLoading(false)
    } else {
      if (weatherData.error) {
        setError(weatherData.error)
        setSearchedCity('')
        setBgImgURL('')
        setCityWeather(null)
        setLoading(false)
      } else {
        let dataBgColor = bgColorIconNumber(
          weatherData?.list[0]?.weather[0]?.icon
        )
        setCityWeather(weatherData)
        setBgColor(dataBgColor)
        setBgImgURL(bgUrl)
        setSearchedCity('')
        setError('')
        setLoading(false)
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

  //KONUM AL
  async function getLocation() {
    if (permission) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let { latitude, longitude } = position.coords
          let weatherData = await getLocationCity({ latitude, longitude })
          setCityWeather(weatherData)
          let bgUrl = await gettingBackgroundImg(weatherData)
          let dataBgColor = bgColorIconNumber(
            weatherData?.list[0]?.weather[0]?.icon
          )
          setBgColor(dataBgColor)
          setBgImgURL(bgUrl)
          setLoading(false)
          //console.log(weatherData);
        },
        (error) => {
          console.log('Konum bilgisi alınamadı: ' + error.message)
          setLoading(false)
        }
      )
    }
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
    setLoading,
    sunSVG,
    monthsList,
    bgImgURL,
    setBgImgURL,
    bgColor,
    setBgColor,
    getLocation,
    location,
    permission,
    setPermission,
  }

  return (
    <WeatherContext.Provider value={initialStates}>
      {children}
    </WeatherContext.Provider>
  )
}

export const API_KEY = '8d077bc643df3cb0e4a1fed9c25edcdd'
export default WeatherContext
