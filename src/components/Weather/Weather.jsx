import axios from "axios";
import debug from "debug";
import { useState, useEffect } from "react";
import { addOutfitService } from "../../utilities/outfits-service";
import shuffleArray from "../../helpers/shuffleArray";
import { HiOutlineStar } from "react-icons/hi";
import { MdExposurePlus1 } from "react-icons/md";
import Swal from "sweetalert2";
import { swalBasicSettings } from "../../utilities/wardrobe-service";
import "./Weather.css";

const log = debug("nextfit:src:components:Weather");

export default function Weather({ apparel, handleUpdateWornFreq }) {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [topApparelImages, setTopApparelImages] = useState([]);
  const [bottomApparelImages, setBottomApparelImages] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=4f57d9637c4c70579c074808bb3a6254&units=metric`
        );
        setWeatherData(response.data.weather[0].description);
        setTemperatureData(Math.round(response.data.main.temp));
        log("Fetched today's weather")
      } catch (error) {
        log("Error fetching today's weather data");
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
      log("Fetched images based on weather data");

      if (fetchImage) {
        let topCategories = [];
          let bottomCategories = [];

          if (lowercaseData.includes("rain")) {
            for (let i = 0; i < 5; i++) {
              const randomChoice = Math.random() < 0.5;
              if (randomChoice) {
                topCategories = ["Dress", "Jumpsuit", "Romper"];
                bottomCategories = ["Jacket"];
              } else {
                topCategories = ["Sweater", "Long Sleeve Shirt", "Hoodie"];
                bottomCategories = ["Pants", "Jeans", "Sweatpants"];
              }
            }
          } else {
              topCategories = ["Blouse", "T-shirt", "Polo Shirt", "Singlet", "Shirt"];
              bottomCategories = ["Shorts", "Skirt", "Pants", "Jeans"];
          }
          log("Fetched images based on weather conditions");

        const filteredTopApparel = filterApparelByCategories(apparel, topCategories);
        const filteredBottomApparel = filterApparelByCategories(apparel, bottomCategories);

        ensureMinimum(filteredTopApparel, 5);
        ensureMinimum(filteredBottomApparel, 5);

        if (filteredTopApparel.length > 0) {
          setTopApparelImages(shuffleApparels(filteredTopApparel, 5));
        }
        if (filteredBottomApparel.length > 0) {
          setBottomApparelImages(shuffleApparels(filteredBottomApparel, 5));
        }
      } else {
        log("No matching weather conditions to fetch images");
        setTopApparelImages([]);
        setBottomApparelImages([]);
      }
    }
  };

  const filterApparelByCategories = (apparel, categories) => {
    return apparel.filter((item) => categories.includes(item.subCategory));
  };

  const ensureMinimum = (array, minimumCount) => {
    while (array.length < minimumCount) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomItem = array[randomIndex];
      if (randomItem) {
        array.push({ imageURL: randomItem.imageURL, _id: randomItem._id });
      }
    }
  };

  const shuffleApparels = (array, count) => {
    const shuffledArray = shuffleArray(
      array.map((item) => ({ imageURL: item.imageURL, _id: item._id }))
    );
    return shuffledArray.slice(0, count);
  };

  useEffect(() => {
    fetchImages();
  }, [weatherData, apparel]);

  const handleGenerate = () => {
    fetchImages();
  }

  const handleAdd = async (topApparelId, bottomApparelId) => {
    try {
      const apparel = {
        top: topApparelId,
        bottom: bottomApparelId,
      };
      log("Adding outfit to favourites");
      await addOutfitService(apparel);
      Swal.fire({
        ...swalBasicSettings("Added to Favourites!", "success"),
      });
      log("Outfit successfully added to favourites");
    } catch (err) {
      log("Error adding outfit to favourites", err);
      Swal.fire({
        ...swalBasicSettings("Error", "error"),
        text: "Outfit is already in your favourites",
      });
    }
  };

  return (
    <>
      <div className="flex items-bottom">
        <h1 className="ml-24 mt-4 md:mt-20 text-xl md:text-2xl">
          Top 5 Outfits Today Based on Weather in Singapore
        </h1>
        <button className="ml-6 mt-20 border border-[#E50A14] bg-[#E50A14] hover:bg-[#C11119]rounded py-1 px-4 font-bebas text-xl"
        onClick={handleGenerate}>GENERATE</button>
      </div>
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
                  handleUpdateWornFreq([
                    topApparelImages[index]?._id,
                    bottomApparelImages[index]?._id,
                  ])
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
