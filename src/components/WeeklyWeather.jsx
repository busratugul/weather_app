import React, { useContext } from 'react'
import WeatherContext from '../context/WeatherContext'

function WeeklyWeather() {
    const {cityWeather} = useContext(WeatherContext)
  return (
    <div>WeeklyWeather</div>
  )
}

export default WeeklyWeather