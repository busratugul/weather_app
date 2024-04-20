import { useContext, useState } from 'react'
import WeatherContext from '../context/WeatherContext'
import DeleteListItemBtn from './DeleteListItemBtn'

function FavCity({ city }) {
  const {
    storedValue,
    favOpen,
    setFavOpen,
    setLoading,
    setNotification,
    defaultCityWeather,
    removeStoredValue,
  } = useContext(WeatherContext)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  //DeleteListItemBtn componentinde favori şehiri silme butonu
  function removeFavCity(city) {
    setNotification({
      type: 'success',
      content: `${city.name} Favori Listenizden Kaldırıldı.`,
      visible: true,
    })
    removeStoredValue(city)
  }

  //DeleteListItemBtn componentinde favori şehiri detaylandırma butonu
  function detailFavCity(city) {
    setLoading(false)
    defaultCityWeather(city)
    setFavOpen(false)
    setLoading(true)
    setIsDeleteOpen(false)
  }

  //eğer listelenecek bir favori listesi varsa ve favOpen true ise
  if (storedValue.length > 0 && favOpen) {
    return (
      <li
        className={`relative w-5/5 md:w-3/5 mx-auto h-16 md:h-20 border border-slate-700 rounded-md flex justify-between items-center mb-5 shadow-md text-base lg:text-lg 2xl:text-xl shadow-gray-900 px-12 lg:px-16 py-3 hover:bg-slate-800 ${
          isDeleteOpen ? 'bg-slate-800 opacity-50' : 'bg-slate-700'
        }`}
        onClick={() => setIsDeleteOpen(!isDeleteOpen)}
      >
        <div
          className={`absolute top-0 bottom-0 right-0 left-1/2 opacity-50 ${
            isDeleteOpen
              ? 'hover:bg-gradient-to-l from-blue-500 duration-500'
              : 'bg-transparent'
          }`}
        ></div>
        <div
          className={`absolute top-0 bottom-0 right-1/2 left-0 opacity-50 ${
            isDeleteOpen
              ? 'hover:bg-gradient-to-r from-red-500 duration-500'
              : 'bg-transparent'
          }`}
        ></div>
        <div className="text-left">
          <h3 className="font-semibold mb-2">{city.name}</h3>
          <p className="text-xs sm:text-base text-slate-400 capitalize">
            {city.description}
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">
            {Math.round(city.temperature)} °C
          </p>
          <p className=" text-slate-400 flex justify-between text-xs sm:text-base">
            <span>Y: {Math.round(city.maxTemp)}</span>
            <span className="ms-2 lg:ms-5 xl:ms-5 2xl:ms-5">
              D: {Math.round(city.minTemp)}
            </span>
          </p>
        </div>
        <DeleteListItemBtn
          isDeleteOpen={isDeleteOpen}
          city={city}
          removeFavCity={removeFavCity}
          detailFavCity={detailFavCity}
        />
      </li>
    )
  }
}

export default FavCity
