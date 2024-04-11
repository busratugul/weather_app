import React, { useContext } from 'react'
import WeatherContext from '../context/WeatherContext'

function Loading() {
    const {sunSVG} = useContext(WeatherContext)
  return (
    <div className="grid place-items-center min-h-96">
      <img src={sunSVG} alt="loading iconu" className="sun-icon rotate" />
      <div className="min-h-64">
        <p className="text-amber-300 tracking-widest pt-12">YÜKLENİYOR</p>
      </div>
    </div>
  )
}

export default Loading
