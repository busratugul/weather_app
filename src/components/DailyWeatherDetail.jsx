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
      <section className="w-full absolute bottom-2 h-auto">
        <h1
          className={`mt-5 mb-3 text-center tracking-wider text-base font-semibold ${
            txtColor ? txtColor : 'text-slate-300'
          }`}
        >
          Hava Durumu Detayları
        </h1>
        <div className="flex overflow-x-auto">
          {DailyWeatherDetail.map((day, idx) => (
            <div
              key={idx}
              className="border border-slate-800 flex-shrink-0 mr-2 shadow-xl text-center shadow-gray-800 bg-gray-700 rounded w-24 h-auto flex flex-col items-center justify-center"
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
              <p className="font-semibold">
                {Math.round(day?.main?.temp)} °C
              </p>
              <p className="capitalize text-xs">
                {day?.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default DailyWeatherDetail
