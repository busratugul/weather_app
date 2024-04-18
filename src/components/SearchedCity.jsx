import { useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'
import Loading from './Loading'
import FavCities from './FavCities'

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
    setNotification
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
        type: "error",
        content: result.error,
        visible: true
      });
      return;
    }
  
    setNotification({
      type: "success",
      content: `${cityWeather.city?.name} Favori Listenize Eklendi.`,
      visible: true
    })
  }

  //Yüklenme tamamlandıysa ve hata yoksa ve aranan şehir geçerli ise
  if (cityWeather && !loading) {
    return (
      <section className="w-full h-full text-center py-4 grid gap-2 mt-5 relative fade-in text-zinc-50 cursor-pointer">
        {!favOpen ? (
          <>
            <div
              className="absolute bg-cover w-full h-full bg-center bg-no-repeat blur-sm -z-1 opacity-50"
              style={{
                backgroundImage: bgImgURL ? `url(${bgImgURL})` : 'none',
              }}
            ></div>
            <div className="z-50 mt-1">
              <h1 className="text-5xl font-bold">
                {cityWeather?.city?.name} ,
                <small className="text-base">
                  {cityWeather?.city?.country}
                </small>
              </h1>
              <p className="text-base mt-1 text-slate-200">
                {getCurrentDate()}
              </p>
              <p className="capitalize mt-2 font-semibold">
                {cityWeather.list &&
                  cityWeather?.list[0].weather[0]?.description}
              </p>
              <article className="flex justify-evenly align-center font-medium">
                <div className="grid place-content-center gap-2 text-base text-left pt-7">
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
                <div className="grid place-content-center">
                  <img
                    className="mx-auto"
                    src={`https://openweathermap.org/img/wn/${cityWeather?.list[0]?.weather[0].icon}@4x.png`}
                    alt="weather icons"
                  />
                  <h1 className="text-4xl mb-8 font-bold">
                    {Math.round(cityWeather?.list[0]?.main?.temp)} °C
                  </h1>
                </div>
              </article>
              <div className="w-full relative">
                <button
                  className="absolute right-10 bottom-0 text-sm text-slate-200 hover:underline"
                  onClick={() => addFavCity(cityWeather)}
                >
                  Ekle
                </button>
              </div>
            </div>
          </>
        ) : (
          <FavCities />
        )}
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
