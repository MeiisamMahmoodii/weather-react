import React from 'react'
import { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import humidity_icon from "../Assets/humidity.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"

export const WeatherApp = () => {

    let ApiKey = "key"

    const [temp, setTemp] = useState()
    const [location, setLocation] = useState()
    const [wind, setWind] = useState()
    const [humadity, setHumadity] = useState()
    const [weathericon, setIcon] = useState()


    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${ApiKey}`

        let response = await fetch(url)
        let data = await response.json()
        try {
            setHumadity(data['main']['humidity'])
            setWind(data['wind']['speed'])
            setLocation(data['name'])
            setTemp(parseInt(data['main']['temp']))
        }
        catch (e) {
            console.log(e)
        }



        if (data['weather'][0]['icon'] == '01d' || data['weather'][0]['icon'] == '01n') {
            setIcon(clear_icon)
            console.log('clear_icon')
        }


        if (data['weather'][0]['icon'] == '02d' || data['weather'][0]['icon'] == '03d' || data['weather'][0]['icon'] == '04d' || data['weather'][0]['icon'] == '02n' || data['weather'][0]['icon'] == '03n' || data['weather'][0]['icon'] == '04n') {
            setIcon(cloud_icon)
            console.log('cloud_icon')

        }

        if (data['weather'][0]['icon'] == '11d' || data['weather'][0]['icon'] == '11n') {
            setIcon(drizzle_icon)
            console.log('drizzle_icon')
        }

        if (data['weather'][0]['icon'] == '09d' || data['weather'][0]['icon'] == '10d' || data['weather'][0]['icon'] == '09n' || data['weather'][0]['icon'] == '10n') {
            setIcon(rain_icon)
            console.log('rain_icon')
        }
        if (data['weather'][0]['icon'] == '13d' || data['weather'][0]['icon'] == '13n') {
            setIcon(snow_icon)
            console.log('snow_icon')
        }



    }



    return (
        <div className='container'>
            <div className="topBar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="searchIcon" onClick={() => { search() }}>
                    <img src={search_icon} alt="Search Button" />
                </div>
            </div>
            <div className="weatherImage">
                <img src={weathericon} alt="" />
            </div>
            <div className="weatherTemp">
                {temp} ºC
            </div>
            <div className="weatherLocation">{location}</div>
            <div className="dataContainer">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humadityPercentage">{humadity}%</div>
                        <div className="text"> Humidity </div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="windSpeed">{wind} Km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
