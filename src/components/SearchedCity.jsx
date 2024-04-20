import { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import Loading from './Loading'
import FavCities from './FavCities'
import DailyWeatherDetail from './DailyWeatherDetail'

function SearchedCity() {
  const {
    cityWeather,
    defaultCityWeather,
    getCurrentDate,
    error,
    loading,
    bgImgURL,
    getLocation,
    permission,
    favOpen,
    addStoredValue,
    setNotification,
  } = useContext(WeatherContext)

  useEffect(() => {
    (async () => {
      if (permission) {
        //Eğer konuma izin verilirse
        return await getLocation()
      } else {
        //Eğer konuma izin verilmezse varsayılan şehir olarak istanbul gösterilecek
        defaultCityWeather('İstanbul')
      }
    })()
  }, [permission])

  //Ekle butonuna basılınca favori şehirlere eklenecek
  function addFavCity(cityWeather) {
    const result = addStoredValue(cityWeather)

    if (result && result.error) {
      setNotification({
        type: 'error',
        content: result.error,
        visible: true,
      })
      return
    }

    setNotification({
      type: 'success',
      content: `${cityWeather.city?.name} Favori Listenize Eklendi.`,
      visible: true,
    })
  }

  //Yüklenme tamamlandıysa ve hata yoksa ve aranan şehir geçerli ise
  if (cityWeather && !loading) {
    return (
      <section className="flex flex-col items-center justify-start text-center relative fade-in text-zinc-50 cursor-pointer h-5/6">
        {!favOpen ? (
          <>
            <div
              className="absolute my-auto bg-cover w-full h-full bg-center bg-no-repeat blur-sm -z-1 opacity-50"
              style={{
                backgroundImage: bgImgURL ? `url(${bgImgURL})` : 'none',
              }}
            ></div>
              <div className='z-50 h-1/4 p-5'>
                <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold">
                  {cityWeather?.city?.name} ,
                  <span className="text-base">
                    {cityWeather?.city?.country}
                  </span>
                </h1>
                <p className="text-xs md:text-sm mt-1 text-slate-200">
                  {getCurrentDate()}
                </p>
                <p className="capitalize mt-2 font-semibold">
                  {cityWeather.list &&
                    cityWeather?.list[0].weather[0]?.description}
                </p>
              </div>
              <div className="w-full h-2/4 flex justify-evenly items-start font-medium relative">
                <div className="grid gap-1 md:gap-2 text-xs md:text-sm lg:text-base text-left">
                  <p>
                    Hissedilen Sıcaklık:
                    <span className="ms-1">
                      {Math.round(cityWeather?.list[0]?.main?.feels_like)} °C
                    </span>
                  </p>
                  <p>
                    Nem Oranı:
                    <span className="ms-1">
                      {cityWeather?.list[0]?.main?.humidity} %
                    </span>
                  </p>
                  <p>
                    Basınç:
                    <span className="ms-1">
                      {cityWeather?.list[0]?.main?.sea_level} hPa
                    </span>
                  </p>
                  <p>
                    Rüzgar Hızı:
                    <span className="ms-1">
                      {Math.round(cityWeather?.list[0]?.wind?.speed)} km/h
                    </span>
                  </p>
                  <p>
                    Görüş:
                    <span className="ms-1">
                      {Math.floor(cityWeather?.list[0]?.visibility / 1000)} km
                    </span>
                  </p>
                  <p>
                    <span>
                      Y:
                      <span className="ms-1">
                        {Math.round(cityWeather?.list[0]?.main?.temp_max)}
                      </span>
                    </span>
                    <span className="ms-5">
                      D:
                      <span className="ms-1">
                        {Math.round(cityWeather?.list[0]?.main?.temp_min)}
                      </span>
                    </span>
                  </p>
                </div>
                <div>
                  <img
                    className="mx-auto w-28 md:w-36 lg:w-40 xl:w-44 2xl:w-48"
                    src={`https://openweathermap.org/img/wn/${cityWeather?.list[0]?.weather[0].icon}@4x.png`}
                    alt="weather icons"
                  />
                  <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl mb-8 font-bold">
                    {Math.round(cityWeather?.list[0]?.main?.temp)} °C
                  </h1>
                </div>
              </div>
              <div className='w-full relative'>
                <button className='absolute right-2 md:right-10 bottom-14 md:bottom-0 p-6 text-base text-slate-200 hover:text-blue-600 hover:underline duration-500 z-50' onClick={() => addFavCity(cityWeather)}>Ekle</button>
                </div>
              
          </>
        ) : (
          <FavCities />
        )}
        <div className='w-full absolute bottom-10 md:bottom-0 h-auto py-2'><DailyWeatherDetail/></div>
      </section>
    )
  }
  //eğer hata mesajı varsa loading true olmuştur ve Loading componenti gösterilecek
  if (error || loading) {
    return (
      <section className="w-full rounded text-center py-10 grid gap-2 min-h-96 mt-5">
        <Loading />
      </section>
    )
  }
}

export default SearchedCity
