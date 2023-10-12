import debug from "debug";
import { useState } from "react";
import {
  updateApparelService,
  uploadToS3Service,
  checkMainCategory,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";
import { order } from "../../../data/apparel-categories";
import Swal from "sweetalert2";
import { GiClothes } from "react-icons/gi";
import { FaCaretDown, FaRegFileImage } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";

const log = debug("nextfit:src:components:ApparelForm");

function ApparelEditForm({ apparel, setApparel }) {
  const { apparelId } = useParams();
  const navigate = useNavigate();
  // console.log("id",apparelId)

  const initialApparelData = {
    mainCategory: "",
    subCategory: "",
    fit: "",
  };

  const [apparelData, setApparelData] = useState(initialApparelData);
  const [imageFiles, setImageFiles] = useState({
    images: [],
    preview: [],
    filenames: [],
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setApparelData({
      ...apparelData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImgFileInput = (e) => {
    const imgFiles = Array.from(e.target.files);
    const updatedPreview = [];
    const updatedFilenames = [];
    console.log(imgFiles);

    imgFiles.forEach((img) => {
      const imgUrl = URL.createObjectURL(img);
      updatedPreview.push(imgUrl);
      updatedFilenames.push(img.name);
    });
    log("imges", imgFiles);
    setImageFiles({
      images: [...imageFiles.images, ...imgFiles],
      preview: [...imageFiles.preview, ...updatedPreview],
      filenames: [...imageFiles.filenames, ...updatedFilenames],
    });
    log("Image uploaded");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (imageFiles.images.length === 0) return;
    setStatus("loading");

    const imgFormData = new FormData();
    imageFiles.images.forEach((img) => {
      imgFormData.append("images", img);
      console.log(imgFormData);
    });
    log("images appended to form", imgFormData);
    try {
      const imgURL = await uploadToS3Service(imgFormData);
      const newApparel = await updateApparelService(apparelId, {
        ...apparelData,
        images: imgURL,
      });
      const prompt = await Swal.fire(
        swalBasicSettings("Successfully updated!", "success")
      );
      if (prompt.isConfirmed) {
        const removedApparel = apparel.filter((item) => item._id !== apparelId);
        setApparel([...removedApparel, newApparel]);
        navigate("/wardrobe");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setStatus("success");
    }
  };

  const handleRemoveImage = () => {
    setImageFiles({
      images: [],
      preview: [],
      filenames: [],
    });
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh]">
      <form
        className="container bg-neutral-400 mx-auto max-w-lg px-4 pb-8"
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={handleUpdate}
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
            <div className="pr-2 mb-6">
              <label
                className="block mb-1 text-sm font-inter font-light text-neutral-600"
                htmlFor="image"
              >
                Image
              </label>
              {imageFiles.images.length !== 0 ? (
                <span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn btn-neutral rounded-none bg-neutral-300 text-neutral-500 border-none mb-2"
                  >
                    Remove File
                  </button>
                  <h3 className="text-neutral-500 font-inter font-normal flex items-center justify-start">
                    <FaRegFileImage className="text-xl" />
                    {imageFiles.filenames}
                  </h3>
                </span>
              ) : (
                <input
                  className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full cursor-pointer font-inter font-extralight"
                  id="image"
                  type="file"
                  accept="image/*"
                  //   required
                  onChange={handleImgFileInput}
                />
              )}
            </div>
          </div>
          <div className="w-1/2 pl-2">
            {imageFiles.preview.length !== 0 ? (
              imageFiles.preview.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview Image ${idx + 1}`}
                  className="mx-auto rounded-lg w-[250px] h-[300px] mt-1"
                />
              ))
            ) : (
              <div className="w-1/2">
                <span className="w-[230px] h-[300px] flex justify-center items-center border-dashed border-2 border-neutral-300">
                  <GiClothes className="text-8xl fill-neutral-300" />
                </span>
              </div>
            )}
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
