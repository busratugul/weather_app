import gettingCityWeather from './weather_api'
import axios from 'axios'
import { API_KEY } from '../context/WeatherContext'

export default async function getLocationCity(location) {
  //console.log(location);
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&lat=${location.latitude}&lon=${location.longitude}`
    )
    //console.log(res.data)
    const weather = await gettingCityWeather(res.data.name)
    return weather
  } catch (error) {
    return { error: 'Konum isteği gerçekleştirilemedi.' }
  }
}

/* https://api.openweathermap.org/data/2.5/weather?&appid=8d077bc643df3cb0e4a1fed9c25edcdd&lat=41.0860519&lon=28.9693921*/
