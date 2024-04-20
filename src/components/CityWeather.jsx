import { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import Location from './Location'
import Favorites from './Favorites'

function CityWeather() {
  const {
    inputRef,
    searchedCity,
    setSearchedCity,
    handleSubmit,
    error,
    txtColor,
    cityWeather,
  } = useContext(WeatherContext)

  useEffect(() => {
    inputRef.current.focus()
  }, [searchedCity])

  return (
    <section className="w-full mt-3 flex pb-4 border-b border-gray-700">
      <div className="w-1/4 grid place-items-center">
        <Location cityWeather={cityWeather} />
      </div>
      <label className="flex-grow w-2/4">
        <p
          className={`w-full text-xs text-center lg:text-base mt-4 ${
            txtColor ? txtColor : 'text-slate-300'
          }`}
        >
          Hava durumu bilgisi için bir şehir girin.
        </p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="max-w-96 min-w-36 mx-auto mt-1"
        >
          <input
            type="text"
            placeholder="Şehir Ara"
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
            className="w-full px-3 py-1 rounded placeholder:text-slate-400 bg-gray-700 border-none outline-none text-md"
            ref={inputRef}
          />
          {error !== '' && (
            //Geçersiz bir şehir arandıysa
            <div>
              <p className="text-red-500 mt-2 text-xs lg:text-sm text-center">
                {error}
              </p>
            </div>
          )}
        </form>
      </label>
      <div className="w-1/4 grid place-items-center">
        <Favorites />
      </div>
    </section>
  )
}

export default CityWeather
