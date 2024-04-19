import { useContext, useMemo } from 'react'
import WeatherContext from '../context/WeatherContext'

function DailyWeatherDetail() {
  const { cityWeather, monthsList, loading, txtColor, favOpen } =
    useContext(WeatherContext)

  const DailyWeatherDetail = useMemo(() => {
    if (cityWeather?.list) {
      //console.log('veri detayları kaydedildi')
      return cityWeather.list.slice(1, 25)
    }
  }, [cityWeather])

  //Gerekli veriler alındıktan sonra detaylandır
  if (cityWeather && !loading && !favOpen) {
    return (
      <section className="w-full absolute bottom-2">
        <h1
          className={`mt-5 mb-3 text-center tracking-wider text-base font-semibold ${
            txtColor ? txtColor : 'text-slate-300'
          }`}
        >
          Hava Durumu Detayları
        </h1>
        <article className="flex overflow-x-auto">
          {DailyWeatherDetail.map((day, idx) => (
            <div
              key={idx}
              className="border border-slate-800 text-center flex-shrink-0 w-28 mr-2 p-2 shadow-xl shadow-gray-800 bg-gray-700 rounded max-w-32"
            >
              <p className="text-sm">
                <span className="mr-1">{day?.dt_txt.substring(8, 10)}</span>
                <span>
                  {monthsList[parseInt(day?.dt_txt.substring(5, 7) - 1)]}
                </span>
              </p>
              <p className="text-xs">{day?.dt_txt.substring(11, 16)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`}
                className="w-16 mx-auto"
              />
              <p className="font-semibold mb-1">
                {Math.round(day?.main?.temp)} °C
              </p>
              <p className="capitalize text-xs">
                {day?.weather[0].description}
              </p>
            </div>
          ))}
        </article>
      </section>
    )
  }
}

export default DailyWeatherDetail
