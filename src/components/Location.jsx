import { useContext } from 'react'
import { MdLocationOn } from 'react-icons/md'
import WeatherContext from '../context/WeatherContext'

function Location() {
  const { txtColor, clickedLocationBtn, locationOpen } = useContext(WeatherContext)

  return (
    <article className="w-1/4 text-3xl grid place-items-center">
      <button
        title={locationOpen ?"Konumu Devre Dışı Bırak" :"Konumu Aktif Et"}
        className={`${
          locationOpen ? 'text-blue-500' : txtColor ? txtColor : 'text-slate-300'
        } hover:text-blue-500 duration-300 w-20 cursor-pointer`}
        onClick={clickedLocationBtn}
      >
        <MdLocationOn className='mx-auto' />
      </button>
    </article>
  )
}

export default Location

/* className="flex flex-col flex-grow items-center mx-auto">
        <p className={`text-sm mb-2 ${txtColor ? txtColor : 'text-slate-300'}`} */