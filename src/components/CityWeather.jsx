import { useContext, useEffect, useRef } from 'react'
import WeatherContext from '../context/WeatherContext'
import Location from './Location'
import Favorites from './Favorites'

function CityWeather() {
  const { inputRef, searchedCity, setSearchedCity, handleSubmit, error,txtColor } = useContext(WeatherContext)

  useEffect(() => {
    inputRef.current.focus()
  }, [searchedCity])

  return (
    <section className="flex items-end w-full">
      <Location />
      <article className="flex flex-col flex-grow items-center mx-auto">
        <label className='w-full'>
        <p className={`text-sm mb-2 text-center ${txtColor ? txtColor : 'text-slate-300'}`}>
          Hava durumu bilgisi için bir şehir girin.
        </p>
        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Şehir Ara"
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
            className="w-full px-3 py-1 rounded placeholder:text-slate-400 bg-gray-700 border-none outline-none text-lg"
            ref={inputRef}
          />
          {error !== '' && (
            //Geçersiz bir şehir arandıysa
            <div>
              <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
            </div>
          )}
        </form>
        </label>
      </article>
      <Favorites />
    </section>
  )
}

export default CityWeather
