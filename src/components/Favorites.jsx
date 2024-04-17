import { useContext, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import WeatherContext from "../context/WeatherContext";

function Favorites() {

  const {txtColor, favOpen, setFavOpen, showFavCities } = useContext(WeatherContext)

  return (
    <article className="w-1/4 text-3xl grid place-items-center">
      <button title="Favoriler"
        className={`${
          txtColor ? txtColor : 'text-slate-300'
        } hover:text-blue-300 duration-300 w-20 cursor-pointer ${favOpen &&"text-blue-500"}`} onClick={() => setFavOpen(!favOpen)}> <MdFavorite className="mx-auto" /></button>
       
    </article>
  )
}

export default Favorites