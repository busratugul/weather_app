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
      className={`h-screen box-border text-zinc-50 font-poppins overflow-y-hidden py-5 ${bgColor}`} 
    >
      <nav className="w-full">
        <h1 className="text-center text-base text-blue-600 tracking-wider mt-5">
          <span className="ps-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-600 before:rounded relative inline-block">
            <span className="relative text-zinc-50 flex items-center">
              iWeather <img src={sunSVG} className="w-6" />
            </span>
          </span>
        </h1>
        {!permission && <Alert/>}
      </nav>
        <CityWeather />
        <SearchedCity />
        <DailyWeatherDetail />
        <Notifications/>
    </main>
  )
}

export default App
