import axios from 'axios'
const API_KEY = '8d077bc643df3cb0e4a1fed9c25edcdd'


//bu fonksiyon city parametresi alıcak, aldığı citye göre arama yapıp veriyi return eder

export default async function gettingCityWeather(searchedCity) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=metric&lang=tr`
    )
    console.log(res.data)
    return res.data
  } catch (error) {
    return { error: 'Lütfen Geçerli Bir Şehir Giriniz!!' }
  }
}

/* https://api.openweathermap.org/data/2.5/weather?q=ankara&appid=8d077bc643df3cb0e4a1fed9c25edcdd&units=metric&lang=tr */
