import { useContext } from 'react'
import WeatherContext from '../context/WeatherContext'
import DeleteListItemBtn from './DeleteListItemBtn'

function FavCity({ city }) {
  const {
    storedValue,
    favOpen,
    setIsDeleteOpen,
    isDeleteOpen,
  } = useContext(WeatherContext)

  //eğer listelenecek bir favori listesi varsa ve favOpen true ise
  if (storedValue.length > 0 && favOpen) {
    return (
      <li
        className={`relative w-full h-28 border border-slate-700 rounded-md flex justify-between mb-5 shadow-md shadow-gray-900 px-16 py-5 hover:bg-slate-800 ${
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
        <div className="text-left flex flex-col justify-between">
          <h3 className="font-semibold">{city.name}</h3>
          <p className="text-base text-slate-400 capitalize">
            {city.description}
          </p>
        </div>
        <div>
          <p className="font-semibold mb-5">
            {Math.round(city.temperature)} °C
          </p>
          <p className="text-base text-slate-400 flex justify-between">
            <span>Y: {Math.round(city.maxTemp)}</span>
            <span className="ms-5">D: {Math.round(city.minTemp)}</span>
          </p>
        </div>
        <DeleteListItemBtn isDeleteOpen={isDeleteOpen} city={city.name} />
      </li>
    )
  }
}

export default FavCity
