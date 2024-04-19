import { FaTimes } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'

function DeleteListItemBtn({ city, removeFavCity, detailFavCity, isDeleteOpen }) {

  //favori şehirleri silme ve detaylandırma butonu
  if (isDeleteOpen) {
    return (
      <>
        <div className="absolute left-3 top-1/3 opacity-100 text-slate-100">
          <button onClick={() => removeFavCity(city)}>
            <FaTimes className="text-red-500" />
          </button>
        </div>
        <div className="absolute right-4 top-1/3">
          <button onClick={() => detailFavCity(city.name)}>
            <FaEye className="text-blue-500" />
          </button>
        </div>
      </>
    )
  }
}

export default DeleteListItemBtn
