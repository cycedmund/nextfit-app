import { useState, useEffect } from "react";
import axios from "axios";
import { getAllApparelService } from "../../utilities/wardrobe-service";
import "./Weather.css"

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [temperatureData, setTemperatureData] = useState(null);
    const [apparel, setApparel] = useState([]);
    const [topApparelImages, setTopApparelImages] = useState([]);
    const [bottomApparelImages, setBottomApparelImages] = useState([]);

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
        const weatherConditions = ["clouds", "clear", "sunny", "haze", "rain"];
        const lowercaseData = weatherData.toLowerCase();
        const fetchImage = weatherConditions.some((condition) => lowercaseData.includes(condition));
    
        if (fetchImage) {
            let topCategories = [];
            let bottomCategories = [];
            if (lowercaseData.includes("rain")) {
                topCategories = ["Sweater", "Long Sleeve Shirt", "Hoodie"];
                bottomCategories = ["Pants", "Jeans", "Sweatpants"];
            } else {
                topCategories = ["Blouse", "T-shirt", "Polo Shirt", "Singlet", "Shirt"];
                bottomCategories = ["Shorts", "Skirt", "Pants", "Jeans"];
            }
            const filteredTopApparel = apparel.filter((item) => topCategories.includes(item.subCategory));
            const filteredBottomApparel = apparel.filter((item) => bottomCategories.includes(item.subCategory));

        if (filteredTopApparel.length > 0) {
        const shuffledTopApparel = shuffleArray(filteredTopApparel.map((item) => item.imageURL));
            setTopApparelImages(shuffledTopApparel.slice(0, 5));
        }
        if (filteredBottomApparel.length > 0) {
        const shuffledBottomApparel = shuffleArray(filteredBottomApparel.map((item) => item.imageURL));
            setBottomApparelImages(shuffledBottomApparel.slice(0, 5));
        }
        } else {
            setTopApparelImages([]);
            setBottomApparelImages([]);
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
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={topApparelImages[0] || ""} />
            <img className="w-28 h-30 object-cover" src={bottomApparelImages[0] || ""} />
            </span>
            </div>
            <div className="weather02">2
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={topApparelImages[1] || ""} />
            <img className="w-28 h-30 object-cover" src={bottomApparelImages[1] || ""} />
            </span>
            </div>
            <div className="weather03">3
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={topApparelImages[2] || ""} />
            <img className="w-28 h-30 object-cover" src={bottomApparelImages[2] || ""} />
            </span>
            </div>
            <div className="weather04">4
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={topApparelImages[3] || ""} />
            <img className="w-28 h-30 object-cover" src={bottomApparelImages[3] || ""} />
            </span>
            </div>
            <div className="weather05">5
            <span className="weather-outfit flex flex-col"><img className="w-28 h-28 object-cover" src={topApparelImages[4] || ""} />
            <img className="w-28 h-30 object-cover" src={bottomApparelImages[4] || ""} />
            </span>
            </div>
        </div>
        </>
    )
}