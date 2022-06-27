import { useState } from 'react'
import axios from 'axios'

const App = () => {

  

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')


  const API_KEY = '0cd805c4ebff1edecf348c04f685cf18'
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=en`

  const searchLocation = (e) => {

    if ( e.key === 'Enter' ) {
      axios.get(URL).then( (res) => {
        setData( res.data ) 
        console.log(res.data)
      })

    }
   
  }



  return (
    <div className="app" >  
      
      <div className="search">
        <input 
        value={location}
        onChange={e =>  setLocation(e.target.value)}
        placeholder="Enter Location"
        onKeyPress={searchLocation}
        type="text" 

        />

      </div>

      <div className="container">

        <div className="top">

          <div className="location bold">
             {data.name ? <p>{data.name}, {data.sys.country} </p> : null }  
          </div>

          <div className="temp">
            {data.main ? <> <h1  > {Math.ceil(data.main.temp)}°C</h1>  <h2> Temp Max: {Math.ceil(data.main.temp_max)}°C</h2> <h2> Temp Min: {Math.round(data.main.temp_min)}°C</h2> </> : null}
          </div>

          <div className="description ">

            {data.weather ? <> <p> {data.weather[0].main},  {data.weather[0].description} </p> </> : null }    

          </div>          
        </div>

        {
          data.name != undefined &&

        <div className="bottom">

          <div className="feels ">
          {data.main ? <p className='bold-description'> {Math.ceil(data.main.feels_like)}°C </p> : null }
            <p>Feels like</p>
          </div>

          <div className="humidity ">
            {data.main ? <p  className='bold-description' > {data.main.humidity}% </p> : null }
            
            <p> Humidity</p>
          </div>

          <div className="wind ">
            {data.wind ? <p className='bold-description' > {data.wind.speed} MPH </p> : null }
            <p>Wind Speed</p>
          </div>

        </div>
        }

        
      </div>

    </div>
  )
}

export default App