import { useContext } from 'react'
import { MdLocationOn } from 'react-icons/md'
import WeatherContext from '../context/WeatherContext'

function Location({ cityWeather }) {
  const { txtColor, clickedLocationBtn, locationOpen } =
    useContext(WeatherContext)
  return (
    <>
      <button
        title={locationOpen ? 'Konumu Devre Dışı Bırak' : 'Konumu Aktif Et'}
        className={`${
          locationOpen
            ? 'text-blue-500'
            : txtColor
            ? txtColor
            : 'text-slate-300'
        } hover:text-blue-500 duration-500 cursor-pointer w-20`}
        onClick={() => clickedLocationBtn(cityWeather?.city?.name)}
      >
        <MdLocationOn className="mx-auto text-2xl lg:text-3xl 2xl:text-4xl" />
      </button>
    </>
  )
}

export default Location
