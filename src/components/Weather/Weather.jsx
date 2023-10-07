import { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css"

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [temperatureData, setTemperatureData] = useState(null);

useEffect(() => {
const fetchWeather = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=4f57d9637c4c70579c074808bb3a6254&units=metric`);
        setWeatherData(response.data.weather[0].description);
        setTemperatureData(response.data.main.temp);
    } catch (error) {
        console.log("Error");
    }
}; fetchWeather();
}, []);

    return (
        <>
        <h1 className="ml-24 mt-20 text-2xl">Top 5 Outfits Today Based on Weather in Singapore</h1>
        <p className="ml-24 text-base mt-1">Current weather: <span className="current-weather capitalize text-yellow-300 font-bold">{weatherData}</span> | <span className="current-weather capitalize text-yellow-300 font-bold">{temperatureData}°C</span></p>
        <div className="weather-table -mt-10">
            <div className="weather01">1
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fba%2F27%2Fba27f6373d0c04e611d3e58dc95165c21cb84f0a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            <img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather02">2
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fba%2F27%2Fba27f6373d0c04e611d3e58dc95165c21cb84f0a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            <img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather03">3
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fba%2F27%2Fba27f6373d0c04e611d3e58dc95165c21cb84f0a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            <img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather04">4
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fba%2F27%2Fba27f6373d0c04e611d3e58dc95165c21cb84f0a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            <img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather05">5
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fba%2F27%2Fba27f6373d0c04e611d3e58dc95165c21cb84f0a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            <img className="w-28 h-28 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
        </div>
        </>
    )
}