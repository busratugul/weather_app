import gettingCityWeather from './weather_api'
import axios from 'axios'
import { API_KEY } from '../context/WeatherContext'

/* BU MODUL KULLANICIDAN ALDIĞI KONUM BİLGİSİNİN CİTYSİ İLE GEREKLİ HAVA DURUMU BİLGİLERİNİ CEKER */

export default async function getLocationCity(location) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&lat=${location.latitude}&lon=${location.longitude}`
    )
    const weather = await gettingCityWeather(res.data.name)
    return weather
  } catch (error) {
    return { error: 'Konum isteği gerçekleştirilemedi.' }
  }
}

