import { useState, useEffect } from "react";
import axios from "axios";
import { addOutfitService } from "../../utilities/outfits-service";
import shuffleArray from "../../helpers/shuffleArray";
import { HiOutlineStar } from "react-icons/hi";
import { MdExposurePlus1 } from "react-icons/md";
import Swal from "sweetalert2";
import { swalBasicSettings } from "../../utilities/wardrobe-service";
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
    try {
    const apparel = {
      top: topApparelId,
      bottom: bottomApparelId,
    };
    await addOutfitService(apparel);
    Swal.fire({
        ...swalBasicSettings("Added to Favourites!", "success"),
    });
    } catch (err) {
        Swal.fire({
            ...swalBasicSettings("Error", "error"),
            text: "Outfit is already in your favourites",
        });
    }
  };

  return (
    <>
      <h1 className="ml-24 mt-4 md:mt-20 text-xl md:text-2xl">
        Top 5 Outfits Today Based on Weather in Singapore
      </h1>
      <p className="ml-24 text-base md:text-lg mt-1">
        Current weather:{" "}
        <span className="current-weather capitalize text-yellow-300 font-bold">
          {weatherData}
        </span>{" "}
        |{" "}
        <span className="current-weather capitalize text-yellow-300 font-bold">
          {temperatureData}°C
        </span>
      </p>
      <div className="text-shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 grid-rows-1 gap-4 ml-20 mr-20 -mt-10 text-large text-black font-bold relative">
        {topApparelImages.map((_, index) => (
          <div
            key={`weather-outfit-${index + 1}`}
            className={`col-span-1 group`}
          >
            {index + 1}
            <span className="-mt-56 ml-28 flex flex-col">
                <span className="w-32 relative">
              <img
                className="w-32 h-36 object-cover rounded-t"
                src={topApparelImages[index].imageURL || ""}
              />
              <img
                className="w-32 h-36 object-cover rounded-b"
                src={bottomApparelImages[index].imageURL || ""}
              />
              <div className="overlay w-32 bg-gray-600 opacity-0 absolute inset-0 rounded-t pointer-events-none group-hover:opacity-50"></div>
              </span>
              <button
                className={`font-normal bg-white hover:bg-gray-400 hover:cursor-pointer py-1 px-1 rounded mt-28 ml-7 w-8 h-8 absolute opacity-0 group-hover:opacity-100 z-2 tooltip tooltip-bottom`}
                data-tip="Add to Favourites"
                onClick={() =>
                  handleAdd(
                    topApparelImages[index]?._id,
                    bottomApparelImages[index]?._id
                  )
                }
              >
                <HiOutlineStar className="w-6 h-6" />
              </button>
              <button
                className={`font-normal bg-white hover:bg-gray-400 py-1 px-1 rounded mt-28 ml-16 w-8 h-8 absolute opacity-0 group-hover:opacity-100 z-2 tooltip tooltip-bottom`}
                data-tip="Add Worn Frequency"
                onClick={() =>
                  handleUpdateWornFreq({
                    topApparelID: topApparelImages[index]?._id,
                    bottomApparelID: bottomApparelImages[index]?._id,
                  })
                }
              >
                <MdExposurePlus1 className="w-6 h-6" />
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
