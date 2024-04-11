import { useContext } from 'react'
import CityWeather from './components/CityWeather'
import SearchedCity from './components/SearchedCity'
import WeatherContext from './context/WeatherContext'

function App() {
  const { sunSVG } = useContext(WeatherContext)

  return (
    <main className="h-lvh w-full bg-gray-900 text-zinc-50 py-4 font-lato overflow-y-hidden">
      <nav className="w-full h-20 mt-3">
        <h1 className="text-center text-2xl text-blue-600 tracking-wider">
          <span className="ps-2 py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-600 before:rounded relative inline-block">
            <span className="relative text-zinc-50 flex">
              iWeather <img src={sunSVG} className="w-8" />
            </span>
          </span>
        </h1>
      </nav>
      <article>
        <CityWeather />
        <SearchedCity />
      </article>
    </main>
  )
}

export default App
