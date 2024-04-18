import { useContext } from 'react'
import WeatherContext from '../context/WeatherContext'

function FavCity({ city }) {
  const {
    defaultCityWeather,
    setFavOpen,
    setLoading,
    removeStoredValue,
    storedValue,
    setNotification,
  } = useContext(WeatherContext)

  //favori şehirlere çift tıklandığında detaylı hava durumu gösterilir.
  function detailFavCity() {
    setLoading(false)
    defaultCityWeather(city.name)
    setFavOpen(false)
    setLoading(true)
  }

  //sil butonuna basıldığı zaman favori şehir silinecek
  function removeFavCity(city) {
    setNotification({
      type:"success",
      content: `${city.name} Favori Listenizden Kaldırıldı.`,
      visible: true,
    })
    removeStoredValue(city)
  }

  //eğer listelenecek bir favori listesi varsa
  if (storedValue.length > 0) {
    return (
      <li
        className={`w-full h-30 border border-slate-700 rounded-md flex justify-between mb-5 shadow-md shadow-gray-900 p-5 bg-slate-700`}
        onDoubleClick={detailFavCity}
      >
        <div className="text-left flex flex-col justify-between ">
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
          <button onClick={() => removeFavCity(city)}>sil</button>
        </div>
      </li>
    )
  }
}

export default FavCity
