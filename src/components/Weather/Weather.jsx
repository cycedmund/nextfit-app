import { useState, useEffect } from "react";
import axios from "axios";
import { getAllApparelService } from "../../utilities/wardrobe-service";
import "./Weather.css"

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [temperatureData, setTemperatureData] = useState(null);
    const [apparel, setApparel] = useState([]);
    const [outfitImages, setOutfitImages] = useState([]);

useEffect(() => {
    const fetchApparelData = async () => {
      const allApparel = await getAllApparelService();
      setApparel(allApparel);
    };
    fetchApparelData();
  }, []);

useEffect(() => {
const fetchWeather = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=4f57d9637c4c70579c074808bb3a6254&units=metric`);
        setWeatherData(response.data.weather[0].description);
        setTemperatureData(Math.round(response.data.main.temp));
    } catch (error) {
        console.log("Error");
    }
}; fetchWeather();
}, []);

useEffect(() => {
    if (weatherData) {
        const weatherConditions = ["clouds", "clear", "sunny", "haze"];
        const lowercaseData = weatherData.toLowerCase();
        const fetchImage = weatherConditions.some((condition) => lowercaseData.includes(condition));
    
        if (fetchImage) {
            const categories = ["Blouse", "T-shirt", "Polo Shirt", "Singlet"];
            const filteredApparel = apparel.filter((item) => categories.includes(item.subCategory));

        if (filteredApparel.length > 0) {
            const shuffledApparel = shuffleArray(filteredApparel.map((item) => item.imageURL));
            setOutfitImages(shuffledApparel.slice(0, 5));
        }
        } else {
            setOutfitImages([]);
        }
    }
}, [weatherData, apparel]);

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

    return (
        <>
        <h1 className="ml-24 mt-20 text-2xl">Top 5 Outfits Today Based on Weather in Singapore</h1>
        <p className="ml-24 text-base mt-1">Current weather: <span className="current-weather capitalize text-yellow-300 font-bold">{weatherData}</span> | <span className="current-weather capitalize text-yellow-300 font-bold">{temperatureData}°C</span></p>
        <div className="weather-table -mt-10">
            <div className="weather01">1
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={outfitImages[0] || ""} />
            <img className="w-28 h-30 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F4f%2F96%2F4f966c80a226875af2b1e1f2044b04701df2c900.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather02">2
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={outfitImages[1] || ""} />
            <img className="w-28 h-30 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F13%2Fb0%2F13b077cb400c559eaf995d7779b867678fdd0a8d.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_trousers%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather03">3
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={outfitImages[2] || ""} />
            <img className="w-28 h-30 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather04">4
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={outfitImages[3] || ""} />
            <img className="w-28 h-30 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
            <div className="weather05">5
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={outfitImages[4] || ""} />
            <img className="w-28 h-30 object-cover" src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F9a%2F3f9a5b41feb2a2eb7c9aacf909a2411254899c88.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" />
            </span>
            </div>
        </div>
        </>
    )
}