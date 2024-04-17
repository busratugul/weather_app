import { useContext } from "react";
import { MdFavorite } from "react-icons/md";
import WeatherContext from "../context/WeatherContext";

function Favorites() {
  const {txtColor} = useContext(WeatherContext)
  return (
    <article className="w-1/4 text-3xl grid place-items-center">
      <button title="Favoriler"
        className={`${
          txtColor ? txtColor : 'text-slate-300'
        } hover:text-blue-300 duration-300`}> <MdFavorite /></button>
       
    </article>
  )
}

export default Favorites