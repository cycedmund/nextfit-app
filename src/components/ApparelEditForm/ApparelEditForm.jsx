import debug from "debug";
import { useState, useRef } from "react";
import {
  updateApparelService,
  getAllApparelService,
  addApparelService,
  uploadToS3Service,
  checkMainCategory,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";
import { order } from "../../../data/apparel-categories";
import Swal from "sweetalert2";
import { GiClothes } from "react-icons/gi";
import { FaCaretDown } from "react-icons/fa6";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const log = debug("nextfit:src:components:ApparelForm");

function ApparelEditForm() {
    const {apparelId} = useParams();

    console.log("id",apparelId)

    const [apparel, setApparel] = useState([]);

    const initialApparelData = {
        mainCategory: "",
        subCategory: "",
        fit: "",
      };

    const [apparelData, setApparelData] = useState(initialApparelData);
     
  
useEffect(() => {
    const fetchApparelData = async () => {
        const allApparel = await getAllApparelService();
        log("fetch all apparel:", allApparel);
        setApparel(allApparel);
    };
    fetchApparelData();
    }, []);

  
  const [status, setStatus] = useState(null);
  const inputImage = useRef(null);

  const resetApparelForm = () => {
    setApparelData(initialApparelData);
    inputImage.current.value = "";
    setStatus(null);
  };

  const handleChange = (e) => {
    setApparelData({
      ...apparelData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleUpdate = async (e, apparelID, apparelData) => {
    e.preventDefault();
    try {
      const result = await updateApparelService(apparelID, apparelData);
      console.log(result)
      const updatedIndex = apparel.findIndex(
        (item) => item._id === apparelID
      );
      if (updatedIndex !== -1) {
        const updatedApparel = [...apparel];

        updatedApparel[updatedIndex] = {
          ...updatedApparel[updatedIndex], ...apparelData
        };

        setApparel(updatedApparel);

        Swal.fire(swalBasicSettings("Updated!", "success"));
      } else {

      Swal.fire({
        ...swalBasicSettings("Error", "error"),
        text: "Item not found for update",
      });
      } 

    } catch (err) {
      console.error(err);
    
  }
};
  
  return (
    <section className="flex justify-center items-center min-h-[80vh]">
      <form
        className="container bg-neutral-400 mx-auto max-w-lg px-4 pb-8"
        autoComplete="off"
        encType="multipart/form-data"
      >
        <header className="text-black font-inter font-light text-2xl text-center my-4">
          Make your edits here! 
        </header>
        <div className="flex mb-6">
          <div className="w-1/2 pr-2 relative">
            <label
              htmlFor="mainCategory"
              className="block mb-1 text-sm font-inter font-light text-neutral-600"
            >
              Main Category
            </label>
            <select
              id="mainCategory"
              name="mainCategory"
              value={apparelData.mainCategory}
              onChange={handleChange}
              required
              className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-pointer font-inter font-extralight"
            >
              <option value="" disabled>
                Select a Main Category
              </option>
              {order.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
            <FaCaretDown className="absolute right-3 top-7 text-gray-500 pointer-events-none z-50 text-3xl" />
          </div>
          <div className="w-1/2 pl-2 relative">
            <label
              htmlFor="subCategory"
              className="block mb-1 text-sm font-inter font-light text-neutral-600"
            >
              Sub Category
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={apparelData.subCategory}
              onChange={handleChange}
              disabled={!apparelData.mainCategory}
              required
              className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-pointer font-inter font-extralight disabled:cursor-default"
            >
              <option value="" disabled>
                Select a Sub Category
              </option>
              {checkMainCategory(apparelData.mainCategory).map(
                (category, index) => (
                  <option key={index}>{category}</option>
                )
              )}
            </select>
            <FaCaretDown className="absolute right-1 top-7 text-gray-500 pointer-events-none z-50 text-3xl" />
          </div>
        </div>
        <div className="flex mb-6">
          <div className="w-1/2">
            <div className="pr-2 mb-6 relative">
              <label
                htmlFor="fit"
                className="block mb-1 text-sm font-inter font-light text-neutral-600"
              >
                Fit
              </label>
              <select
                id="fit"
                name="fit"
                value={apparelData.fit}
                onChange={handleChange}
                required
                className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-pointer font-inter font-extralight"
              >
                <option value="" disabled>
                  Select a Fit
                </option>
                <option>Loose</option>
                <option>Regular</option>
                <option>Tight</option>
              </select>
              <FaCaretDown className="absolute right-3 top-7 text-gray-500 pointer-events-none z-50 text-3xl" />
            </div>
            <br/>
            <br/>
            <br/>
          </div>
          
        </div>
        {status === "loading" ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-dots loading-lg bg-gray-500 px-3 py-2.5 "></span>
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-[#E50914] hover:bg-[#e50914be] focus:ring-2 focus:outline-none focus:ring-gray-400 font-inter font-normal text-lg px-3 py-2.5 text-center w-full"
            onClick={() => handleUpdate(apparelId, apparelData)}
          >
            SUBMIT
          </button>
        )}
      </form>
    </section>
  );
}

export default ApparelEditForm;

// URL.createObjectURL -> https://reacthustle.com/blog/react-preview-images-before-uploading
