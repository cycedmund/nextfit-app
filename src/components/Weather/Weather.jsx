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
    let filteredTopApparel = [];
    let filteredBottomApparel = [];

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

const fetchImages = async () => {
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
            filteredTopApparel = apparel.filter((item) => topCategories.includes(item.subCategory));
            filteredBottomApparel = apparel.filter((item) => bottomCategories.includes(item.subCategory));

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
}

useEffect(() => {
    fetchImages()
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
    {topApparelImages.map((topImage, index) => (
        <div key={`weather-outfit-${index + 1}`} className={`weather${index + 1}`}>
            {index + 1}
            <span className="weather-outfit flex flex-col">
                <img
                    className="w-28 h-28 object-cover rounded-t"
                    src={topImage || ""}
                    alt={filteredTopApparel[index]?._id || " "}
                />
                <img
                    className="w-28 h-32 object-cover rounded-b"
                    src={bottomApparelImages[index] || ""}
                    alt={filteredBottomApparel[index]?._id || ""}
                />
                <button className="text-base text-tiny bg-gray-300 hover:bg-gray-400 font-bold py-1 px-1 rounded mt-2 w-2/3 -ml-2">
                    Add to Favourites
                </button>
                <button className="text-base text-tiny bg-gray-300 hover:bg-gray-400 font-bold py-1 px-1 rounded mt-1 w-2/3 -ml-2">
                    I worn this!
                </button>
            </span>
        </div>
    ))}
</div>
        </>
    )
}