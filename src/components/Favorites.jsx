import { useContext } from 'react'
import { MdFavorite } from 'react-icons/md'
import WeatherContext from '../context/WeatherContext'

function Favorites() {
  const { txtColor, favOpen, setFavOpen } = useContext(WeatherContext)

  return (
    <>
      <button
        title="Favoriler"
        className={`${
          favOpen ? 'text-blue-500' : txtColor ? txtColor : 'text-slate-300'
        } hover:text-blue-500 duration-300 w-20 cursor-pointer`}
        onClick={() => setFavOpen(!favOpen)}
      >
        <MdFavorite className="mx-auto text-2xl lg:text-3xl 2xl:text-4xl" />
      </button>
    </>
  )
}

export default Favorites
