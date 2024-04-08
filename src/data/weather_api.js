const API_KEY = '8d077bc643df3cb0e4a1fed9c25edcdd'

//bu fonksiyon city parametresi alıcak, aldığı citye göre arama yapıp veriyi return eder

//e.keyCode = 13 entera eşittir

export default async function gettingCityWeather(searchedCity) {
  try {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=metric&lang=tr`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
    console.log(searchedCity)
  } catch (error) {
    return console.log('Hata Oluştu:' + error.message)
  }
}

/* https://api.openweathermap.org/data/2.5/weather?q=ankara&appid=8d077bc643df3cb0e4a1fed9c25edcdd&units=metric&lang=tr */
