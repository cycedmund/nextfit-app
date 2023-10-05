import debug from "debug";
import { useState } from "react";

const log = debug("nextfit:src:components:ApparelForm");

function ApparelForm() {
  const [apparelData, setApparelData] = useState({
    name: "",
    category: "",
    fit: "",
    images: [],
    preview: [],
  });

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

    const formData = new FormData();
    apparelData.images.forEach((img) => {
      formData.append("images", img);
    });
    log("images appended to form", formData);

    try {
      const responseS3 = await fetch("/api/apparel/upload", {
        method: "POST",
        body: formData,
      });
      const dataS3 = await responseS3.json();
      console.log(dataS3);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container bg-neutral-400 mx-auto max-w-md px-4">
      <header className="text-white font-bold text-2xl text-center mt-4">
        Add to your closet
      </header>
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="T-shirt / V neck sweatshirt"
            value={apparelData.name}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={apparelData.category}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>Short Sleeve Tops</option>
            <option>Long Sleeve Tops</option>
            <option>Dress</option>
            <option>Sweater</option>
            <option>Hoodie</option>
            <option>Pants</option>
            <option>Jeans</option>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>Baggy</option>
            <option>Normal</option>
            <option>Tight</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="image"
          >
            Upload Apparel Images
            <br />
            <small className="text-gray-500">
              (For multiple files, upload all at once)
            </small>
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImgFileInput}
            multiple
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

// TODO
// 1. remove state, when remove images from upload -> a delete button
// 2. cater for multiple inputs? or only limit to one category?
// 3. slice and only allow 10 image input -> accept array of 10 files
