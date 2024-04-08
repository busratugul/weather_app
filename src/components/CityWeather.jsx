import React, { useContext, useEffect } from 'react'
import gettingCityWeather from '../data/weather_api'
import WeatherContext from '../context/WeatherContext'

function CityWeather() {
  const { searchedCity, setSearchedCity, handleSubmit } =
    useContext(WeatherContext)

  useEffect(() => {
    gettingCityWeather('London')
  }, [])

  return (
    <main>
      <nav>
        <h4>iWeather</h4>
      </nav>
      <section>
        <h3>Welcome To TypeWeather</h3>
        <p>Chose a location to see the weather forecast</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Search location"
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
          />
        </form>
      </section>
    </main>
  )
}

export default CityWeather
