import { useState, useContext, useEffect } from 'react'
import WeatherContext from '../context/WeatherContext'

function Alert() {
  const [isVisible, setIsVisible] = useState(true)
  const { setPermission, setLoading } = useContext(WeatherContext)

  //Konum bilgisine izin verilsin
  function handleClick() {
    setPermission(true)
    setIsVisible(false)
    setLoading(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [isVisible])

  return (
    <>
      {isVisible && ( 
        <div className="absolute left-1/2 transform -translate-x-1/2 top-32 px-4 py-2 rounded-md bg-blue-200 text-slate-800 z-40 shadow-2xl shadow-black border border-slate-500">
          <p className="font-semibold">Konum Bilginizi Paylaşmak İster Misiniz? </p>
          <div className='flex justify-between mt-2'>
            <button className='hover:bg-red-300 px-3 rounded-md duration-300 ' onClick={() => setIsVisible(false)}>Hayır</button>
            <button className="px-3 rounded-md hover:bg-green-300 duration-300" onClick={handleClick}>
              Evet
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Alert
