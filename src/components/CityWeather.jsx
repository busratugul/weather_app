import React, { useContext} from 'react'
import WeatherContext from '../context/WeatherContext'
import getUVIndex from '../data/uvindex_api'

function CityWeather() {
  //contexten gerekli proplar alındı
  const { searchedCity, setSearchedCity, handleSubmit, error } =
    useContext(WeatherContext)

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
          {error !== '' && (
            <div>
              <p>{error}</p>
            </div>
          )}
        </form>
      </section>
    </main>
  )
}

export default CityWeather
