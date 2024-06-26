import { createContext, useState, useRef } from 'react'
import gettingCityWeather from '../data/weather_api'
import sunSVG from '../assets/clear.png'
import gettingBackgroundImg from '../data/background_api'
import bgColorIconNumber from '../data/background_color'
import getLocationCity from '../data/location_api'
import setTextColor from '../data/textcolor_api'
import useLocalStorage from '../hooks/useLocalStorage'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  /* ----------------STATES-------------------*/
  const [searchedCity, setSearchedCity] = useState('')
  const [cityWeather, setCityWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [bgImgURL, setBgImgURL] = useState('')
  const [txtColor, setTxtColor] = useState('')
  const [bgColor, setBgColor] = useState('bg-slate-800')
  const [permission, setPermission] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [notification, setNotification] = useState({
    type: '',
    content: '',
    visible: false,
  })

  const { storedValue, addStoredValue, removeStoredValue, updateStoredValue } =
    useLocalStorage()

  const inputRef = useRef(null)

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
    if (searchedCity === '') {
      //boş isteği engelle
      setError('Lütfen Geçerli Bir Şehir İsmi Giriniz')
      setLoading(false)
    } else {
      //eğer bir value girilmişse kontrol et
      let bgUrl = await gettingBackgroundImg(searchedCity)
      let weatherData = await gettingCityWeather(searchedCity)
      if (weatherData.error) {
        //eğer geçersiz bir şehir ise hata ver
        setError(weatherData.error)
        setSearchedCity('')
        setBgImgURL('')
        setCityWeather(null)
        setLoading(false)
      } else {
        //geçerli bir şehir ise
        setCityWeather(weatherData)
        let dataBgColor = bgColorIconNumber(
          weatherData?.list[0]?.weather[0]?.icon
        )
        setBgColor(dataBgColor)
        let color = setTextColor(weatherData?.list[0]?.weather[0]?.icon)
        setTxtColor(color)
        setBgImgURL(bgUrl)
        setSearchedCity('')
        setError('')
        setFavOpen(false)
        setLoading(false)
      }
    }
  }

  async function defaultCityWeather(city) {
    let weatherData = await gettingCityWeather(city)
    let bgUrl = await gettingBackgroundImg(city)
    setCityWeather(weatherData)
    setBgImgURL(bgUrl)
    let dataBgColor = bgColorIconNumber(weatherData?.list[0]?.weather[0]?.icon)
    let color = setTextColor(weatherData?.list[0]?.weather[0]?.icon)
    setBgColor(dataBgColor)
    setTxtColor(color)
    setLoading(false)
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
    setLocationOpen(true)
    if (permission) {
      //konuma izin verilmiş ise konumu al
      setNotification({
        type: 'success',
        content: 'Konum Paylaşımı Aktif Edildi.',
        visible: 'true',
      })
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let { latitude, longitude } = position.coords
          let weatherData = await getLocationCity({ latitude, longitude })
          //alınan konumu gerekli fonksiyonlara gönder
          setCityWeather(weatherData)
          let bgUrl = await gettingBackgroundImg(weatherData)
          let dataBgColor = bgColorIconNumber(
            weatherData?.list[0]?.weather[0]?.icon
          )
          let color = setTextColor(weatherData?.list[0]?.weather[0]?.icon)
          setBgColor(dataBgColor)
          setTxtColor(color)
          setBgImgURL(bgUrl)
          setLoading(false)
          inputRef.current.focus()
        },
        (error) => {
          //konum bilgisinde hata olursa
          setError('Konum bilgisi alınamadı!')
          console.log(error.message)
          setLocationOpen(false)
          setLoading(false)
        }
      )
    }
  }

  //KONUM AL BUTONUNA TIKLANIRSA KONUMU AKTİF ET
  function clickedLocationBtn(city) {
    if (!locationOpen) {
      setLoading(false)
      setPermission(true)
      setNotification({
        content: 'Konum Paylaşımı Aktif Edildi.',
        visible: 'true',
      })
      getLocation()
      setFavOpen(false)
      setLoading(true)
    } else {
      setNotification({
        type: 'success',
        content: 'Konum Paylaşımı Devre Dışı Bırakıldı.',
        visible: 'true',
      })
      setFavOpen(false)
      defaultCityWeather(city)
      setLocationOpen(false)
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
    defaultCityWeather,
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
    permission,
    setPermission,
    txtColor,
    inputRef,
    clickedLocationBtn,
    favOpen,
    setFavOpen,
    setError,
    locationOpen,
    notification,
    setNotification,
    addStoredValue,
    removeStoredValue,
    updateStoredValue,
    storedValue,
  }

  return (
    <WeatherContext.Provider value={initialStates}>
      {children}
    </WeatherContext.Provider>
  )
}

export const API_KEY = '8d077bc643df3cb0e4a1fed9c25edcdd'
export default WeatherContext
