import { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import FavCity from './FavCity'

function FavCities() {
  const { favOpen, txtColor, storedValue, updateStoredValue, setNotification } =
    useContext(WeatherContext)

  useEffect(() => {
    (async () => {
      if (favOpen && storedValue.length > 0) {
        for (const city of storedValue) {
          const result = await updateStoredValue(city)
          if (result && result.error) {
            console.error(result.error)
            setNotification({
              type: 'error',
              content: result.error,
              visible: 'true',
            })
            return
          }
        }
        setNotification({
          type: 'success',
          content: 'Favori Listeniz Güncellendi.',
          visible: 'true',
        })
      }
    })()
  }, [favOpen])

  if (favOpen) {
    return (
      <section className="w-full min-h-80 fade-in pb-5 text-2xl border-t border-slate-600">
        {storedValue.length > 0 ? (
          <>
            <h1
              className={`font-semibold text-center my-5 ${
                txtColor ? txtColor : 'text-slate-300'
              }`}
            >
              Favori Şehirler
            </h1>
            <ul className="w-4/5 mx-auto">
              {storedValue.map((city, idx) => (
                <FavCity key={idx} city={city} />
              ))}
            </ul>
          </>
        ) : (
          <div className="w-full h-full grid place-items-center">
            <p className="text-gray-400">Favori Şehriniz Bulunmamaktadır.</p>
          </div>
        )}
      </section>
    )
  }
}

export default FavCities
