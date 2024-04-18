import { useContext } from 'react'
import CityWeather from './components/CityWeather'
import SearchedCity from './components/SearchedCity'
import WeatherContext from './context/WeatherContext'
import DailyWeatherDetail from './components/DailyWeatherDetail'
import Alert from './components/Alert'
import Notifications from './components/Notifications'

function App() {
  const { sunSVG, bgColor, permission} = useContext(WeatherContext)
  
  return (
    <main
      className={`h-lvh w-full  text-zinc-50 py-4 font-poppins overflow-y-hidden ${bgColor}`}
    >
      <nav className="w-full h-20 mt-2">
        <h1 className="text-center text-2xl text-blue-600 tracking-wider">
          <span className="ps-2 py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-600 before:rounded relative inline-block">
            <span className="relative text-zinc-50 flex">
              iWeather <img src={sunSVG} className="w-8" />
            </span>
          </span>
        </h1>
        {!permission && <Alert/>}
      </nav>
      <article>
        <CityWeather />
        <SearchedCity />
        <DailyWeatherDetail />
        <Notifications/>
      </article>
    </main>
  )
}

export default App
