import React, { useState } from 'react'
import Search_icon from "../assets/search.png"
import Clear_icon from "../assets/clear.png"
import Cloud_icon from "../assets/cloud.png"
import drizzele_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import "./w.css"

export default function W(items) {
  const api_key="c6bea8d24e96c7dde232926a28aa21fd";
  const[mainicon,setmainicon]=useState(Cloud_icon);

  const search=async ()=>{
    let element=document.getElementsByClassName("inputcityname");
    if(element[0].value===""){
      return 0;
    }
     
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
    let response=await fetch(url);
    let parseresponse= await response.json();
  
    const humidity=document.getElementsByClassName("humi-pers");
    const windrate=document.getElementsByClassName("humi-pers-wind");
    const degree=document.getElementsByClassName("degree");
    const cityName=document.getElementsByClassName("city-name");
    humidity[0].innerHTML=parseresponse.main.humidity +"%";
    windrate[0].innerHTML=parseresponse.wind.speed +" km/h";
    degree[0].innerHTML=parseresponse.main.temp +"°C";
    cityName[0].innerHTML=parseresponse.name;
    if(element[0].value===parseresponse.name){
      return 0;
     }
  
      if(parseresponse.weather[0].icon==="01d"||parseresponse.weather[0].icon==="01n"){
      setmainicon(Clear_icon);
    }else if(parseresponse.weather[0].icon==="02d"||parseresponse.weather[0].icon==="02n"){
      setmainicon(rain_icon);
     }else if(parseresponse.weather[0].icon==="03d"||parseresponse.weather[0].icon==="03n"){
      setmainicon(drizzele_icon)
     }else if(parseresponse.weather[0].icon==="04d"||parseresponse.weather[0].icon==="04n"){
      setmainicon(snow_icon)
    }
     else if(parseresponse.weather[0].icon==="09d"||parseresponse.weather[0].icon==="09n"){
        setmainicon(Cloud_icon)
      }else if(parseresponse.weather[0].icon==="10d"||parseresponse.weather[0].icon==="10n"){
        setmainicon(rain_icon)
      }
      else if(parseresponse.weather[0].icon==="13d"||parseresponse.weather[0].icon==="13n"){
        setmainicon(snow_icon)
      }else{
        setmainicon(Clear_icon)
      }
    }
  return (
    <div className='container'>
        <div className="top-bar">
          <input className='inputcityname' type='search' placeholder='Enter The Location' />
          <div className="search-icon" onClick={()=>{search()}}>
            <img src={Search_icon} alt="search-icon" />
          </div>
        </div>
        <div className="middle-part">
        <div className="middle-image">
          <img src={mainicon} alt="cloud" />
        </div>
        <div className="degree">24°c</div>
        <div className="city-name">London</div>  
     </div>
     <div className="footer">
     <div className="humidity">
     <div className="hu-wi-icon">
        <img src={humidity_icon} alt="humidity" />
      </div>
      <div className="weather-value">
       <div className="humi-pers">
        75%
      </div>
      <div className="humidity-letter">
         HUMIDITY
      </div>
      </div>
     </div>
      <div className="wind">
      <div className="hu-wi-icon">
        <img src={wind_icon} alt="humidity" />
      </div>
      <div className="weather-value">
        <div className="humi-pers-wind">
          5.15 km/h
        </div>
      <div className="humidity-letter">
         WIND SPEED
      </div>
      </div>
      </div>
     </div>
    </div>
  )
}
