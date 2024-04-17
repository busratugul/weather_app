import { useContext,useMemo } from 'react'
import WeatherContext from '../context/WeatherContext'

function DailyWeatherDetail() {
  const { cityWeather, monthsList, loading, txtColor, favOpen } = useContext(WeatherContext)

  const DailyWeatherDetail = useMemo(() => {
    if (cityWeather?.list) {
      //console.log('veri detayları kaydedildi')
      return cityWeather.list.slice(1, 15)
    }
  }, [cityWeather])

  //Gerekli veriler alındıktan sonra detaylandır
  if (cityWeather && !loading && !favOpen){ 
    return (
      <>
        <h1 className={`mt-3 mb-3 text-center tracking-wider text-lg font-semibold ${txtColor ?txtColor :"text-slate-300"}`}>
          Hava Durumu Detayları
        </h1>
        <section className="w-full overflow-x-auto gap-4">
          <div className="flex ">
            {DailyWeatherDetail.map((day, idx) => (
              <div
                key={idx}
                className="border border-slate-800 text-center flex-shrink-0 w-27 mr-2 px-4 py-2 shadow-xl bg-gray-700 rounded max-w-32"
              >
                <p className="text-sm">
                  <span className="mr-1">{day?.dt_txt.substring(8, 10)}</span>
                  <span>
                    {monthsList[parseInt(day?.dt_txt.substring(5, 7) - 1)]}
                  </span>
                </p>
                <p>{day?.dt_txt.substring(11, 16)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`}
                  className="m-0 p-0 w-20"
                />
                <p>{Math.round(day?.main?.temp)} °C </p>
                <p className="capitalize text-sm">{day?.weather[0].description}</p>
              </div>
            ))}
          </div>
        </section>
      </>
    )}
  }


export default DailyWeatherDetail
