import { useContext } from 'react'
import CityWeather from './components/CityWeather'
import Weather from './components/SearchedCity'
import WeatherContext from './context/WeatherContext'
import DailyWeatherDetail from './components/DailyWeatherDetail'

function App() {
  const { sunSVG } = useContext(WeatherContext)

  return (
    <main className="h-lvh w-full bg-gray-900 text-slate-50 py-5 font-lato">
      <nav className="w-full h-20 my-3">
        <h1 className="text-center text-3xl text-blue-600 tracking-wider">
          <span className="ms-2 py-2 ps-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-600 before:rounded relative inline-block">
            <span className="relative text-white flex">
              iWeather <img src={sunSVG} className="w-10" />
            </span>
          </span>
        </h1>
      </nav>
      <article>
        <CityWeather />
        <Weather />
        <DailyWeatherDetail/>
      </article>
    </main>
  )
}

export default App
