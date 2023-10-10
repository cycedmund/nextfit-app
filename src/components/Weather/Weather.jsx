import { useState, useEffect } from "react";
import axios from "axios";
import { addOutfitService } from "../../utilities/outfits-service";
import shuffleArray from "../../helpers/shuffleArray";
import "./Weather.css";

export default function Weather({ apparel, handleUpdateWornFreq }) {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [topApparelImages, setTopApparelImages] = useState([]);
  const [bottomApparelImages, setBottomApparelImages] = useState([]);
  let filteredTopApparel = [];
  let filteredBottomApparel = [];


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=4f57d9637c4c70579c074808bb3a6254&units=metric`
        );
        setWeatherData(response.data.weather[0].description);
        setTemperatureData(Math.round(response.data.main.temp));
      } catch (error) {
        console.log("Error");
      }
    };
    fetchWeather();
  }, []);

  const fetchImages = async () => {
    if (weatherData) {
      const weatherConditions = ["clouds", "clear", "sunny", "haze", "rain"];
      const lowercaseData = weatherData.toLowerCase();
      const fetchImage = weatherConditions.some((condition) =>
        lowercaseData.includes(condition)
      );

      if (fetchImage) {
        let topCategories = [];
        let bottomCategories = [];
        if (lowercaseData.includes("rain")) {
          topCategories = ["Sweater", "Long Sleeve Shirt", "Hoodie"];
          bottomCategories = ["Pants", "Jeans", "Sweatpants"];
        } else {
          topCategories = [
            "Blouse",
            "T-shirt",
            "Polo Shirt",
            "Singlet",
            "Shirt",
          ];
          bottomCategories = ["Shorts", "Skirt", "Pants", "Jeans"];
        }
        filteredTopApparel = apparel.filter((item) =>
          topCategories.includes(item.subCategory)
        );
        filteredBottomApparel = apparel.filter((item) =>
          bottomCategories.includes(item.subCategory)
        );

        // ChatGPT - How to ensure there are 5 tops and bottoms listed even when the clothing items uploaded are less than 5
        while (filteredTopApparel.length < 5) {
          const randomIndex = Math.floor(
            Math.random() * filteredTopApparel.length
          );
          const randomTop = filteredTopApparel[randomIndex]?.imageURL;
          const randomID = filteredTopApparel[randomIndex]?._id;
          filteredTopApparel.push({ imageURL: randomTop, _id: randomID });
        }
        while (filteredBottomApparel.length < 5) {
          const randomIndex = Math.floor(
            Math.random() * filteredBottomApparel.length
          );
          const randomBottom = filteredBottomApparel[randomIndex]?.imageURL;
          const randomID = filteredBottomApparel[randomIndex]?._id;
          filteredBottomApparel.push({ imageURL: randomBottom, _id: randomID });
        }
        if (filteredTopApparel.length > 0) {
          const shuffledTopApparel = shuffleArray(
            filteredTopApparel.map((item) => {
              return { imageURL: item.imageURL, _id: item._id };
            })
          );
          setTopApparelImages(shuffledTopApparel.slice(0, 5));
        }
        if (filteredBottomApparel.length > 0) {
          const shuffledBottomApparel = shuffleArray(
            filteredBottomApparel.map((item) => {
              return { imageURL: item.imageURL, _id: item._id };
            })
          );
          setBottomApparelImages(shuffledBottomApparel.slice(0, 5));
        }
      } else {
        setTopApparelImages([]);
        setBottomApparelImages([]);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, [weatherData, apparel]);

  const handleAdd = async (topApparelId, bottomApparelId) => {
    const apparel = {
      top: topApparelId,
      bottom: bottomApparelId,
    };
    // console.log(apparel);
    await addOutfitService(apparel);
  };
  return (
    <>
      <h1 className="ml-24 mt-20 text-2xl">
        Top 5 Outfits Today Based on Weather in Singapore
      </h1>
      <p className="ml-24 text-base mt-1">
        Current weather:{" "}
        <span className="current-weather capitalize text-yellow-300 font-bold">
          {weatherData}
        </span>{" "}
        |{" "}
        <span className="current-weather capitalize text-yellow-300 font-bold">
          {temperatureData}°C
        </span>
      </p>
      <div className="weather-table -mt-10">
        {topApparelImages.map((_, index) => (
          <div
            key={`weather-outfit-${index + 1}`}
            className={`weather${index + 1}`}
          >
            {index + 1}
            <span className="weather-outfit flex flex-col">
              <img
                className="w-28 h-32 object-cover rounded-t"
                src={topApparelImages[index].imageURL || ""}
              />
              <img
                className="w-28 h-32 object-cover rounded-b"
                src={bottomApparelImages[index].imageURL || ""}
              />
              <button
                className="text-base text-tiny bg-gray-300 hover:bg-gray-400 font-bold py-1 px-1 rounded mt-2 w-2/3 -ml-2"
                onClick={() =>
                  handleAdd(
                    topApparelImages[index]?._id,
                    bottomApparelImages[index]?._id
                  )
                }
              >
                Add to Favourites
              </button>
              <button
                className="text-base text-tiny bg-gray-300 hover:bg-gray-400 font-bold py-1 px-1 rounded mt-1 w-2/3 -ml-2"
                onClick={() =>
                  handleUpdateWornFreq({
                    topApparelID: topApparelImages[index]?._id,
                    bottomApparelID: bottomApparelImages[index]?._id,
                  })
                }
              >
                I worn this!
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
