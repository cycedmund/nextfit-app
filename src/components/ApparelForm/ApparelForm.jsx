import debug from "debug";
import { useState, useRef } from "react";
import {
  addApparelService,
  uploadToS3Service,
} from "../../utilities/wardrobe-service";
import { allSubCategories } from "../../../data/sub-categories";

const log = debug("nextfit:src:components:ApparelForm");

function ApparelForm() {
  const initialApparelData = {
    mainCategory: "",
    subCategory: "",
    fit: "",
    images: [],
    preview: [],
  };
  const [apparelData, setApparelData] = useState(initialApparelData);
  const inputImage = useRef(null);

  const resetApparelForm = () => {
    setApparelData(initialApparelData);
    inputImage.current.value = "";
    //setError("")
  };

  const handleChange = (e) => {
    setApparelData({
      ...apparelData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImgFileInput = (e) => {
    const imgFiles = Array.from(e.target.files);
    const updatedPreview = [];

    imgFiles.forEach((img) => {
      const imgUrl = URL.createObjectURL(img);
      updatedPreview.push(imgUrl);
    });
    setApparelData({
      ...apparelData,
      images: [...apparelData.images, ...imgFiles],
      preview: [...apparelData.preview, ...updatedPreview],
    });
    log("Image uploaded");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (apparelData.images.length === 0) return;

    const imgFormData = new FormData();
    apparelData.images.forEach((img) => {
      imgFormData.append("images", img);
    });
    log("images appended to form", imgFormData);

    try {
      const imgURL = await uploadToS3Service(imgFormData);
      const apparelItem = await addApparelService({
        ...apparelData,
        images: imgURL,
      });
      console.log(apparelItem);
      // setState(apparelItem) -> navigate to wardrobe
      resetApparelForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container bg-neutral-400 mx-auto max-w-md px-4">
      <header className="text-white font-bold text-2xl text-center mt-4">
        Add to your closet
      </header>
      <form className="p-8" onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-6">
          <label
            htmlFor="mainCategory"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Main Category
          </label>
          <select
            id="mainCategory"
            name="mainCategory"
            value={apparelData.mainCategory}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" disabled>
              Select a Main Category
            </option>
            <option>Top</option>
            <option>Bottom</option>
            <option>Outerwear</option>
            <option>Overall</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="subCategory"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sub Category
          </label>
          <select
            id="subCategory"
            name="subCategory"
            value={apparelData.subCategory}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" disabled>
              Select a Sub Category
            </option>
            {allSubCategories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="fit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fit
          </label>
          <select
            id="fit"
            name="fit"
            value={apparelData.fit}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" disabled>
              Select a Fit
            </option>
            <option>Loose</option>
            <option>Regular</option>
            <option>Tight</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="image"
          >
            Upload Apparel Images
            {/* <br />
            <small className="text-gray-500">
              (For multiple files, upload all at once)
            </small> */}
          </label>
          <input
            ref={inputImage}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            id="image"
            type="file"
            accept="image/*"
            required
            onChange={handleImgFileInput}
            //! multiple
          />
        </div>
        <div className="flex">
          {apparelData.preview.length !== 0 &&
            apparelData.preview.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview Image ${idx + 1}`}
                width={100}
                height={100}
                className="mx-auto mb-6"
              />
            ))}
        </div>
        <button
          type="submit"
          className="text-white bg-[#E50914] hover:bg-[#e50914be] focus:ring-2 focus:outline-none focus:ring-gray-400 font-medium text-lg px-3 py-2.5 text-center w-full rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default ApparelForm;

// URL.createObjectURL -> https://reacthustle.com/blog/react-preview-images-before-uploading
