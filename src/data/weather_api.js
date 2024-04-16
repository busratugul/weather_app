import axios from 'axios'
import { API_KEY } from '../context/WeatherContext'
import gettingBackgroundImg from './background_api'

/* BU MODUL ARANAN ŞEHİRİ PARAMETRE OLARAK ALIR, ARANAN ŞEHİRE GÖRE ARAMA YAPIP VERİYİ RETURN EDER */

export default async function gettingCityWeather(searchedCity) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=metric&appid=${API_KEY}&lang=tr`
    )
    //console.log(res.data)
    return res.data
  } catch (error) {
    return { error: 'Lütfen Geçerli Bir Şehir Giriniz!!' }
  }
}
