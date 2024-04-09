/* Bu fonksiyon aranılan şehrin koordinatlarını alıp uv indexini return edecektir. */
import axios from 'axios'
const API_KEY = '8d077bc643df3cb0e4a1fed9c25edcdd'

export default async function getUVIndex(latitude, longitude) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${API_KEY}`
    )
    console.log(res.data)
    return res.data
  } catch (error) {
    return { error: 'UV Index bilgisine erişilemedi' }
  }
}

