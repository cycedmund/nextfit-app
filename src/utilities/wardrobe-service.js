import {
  bottomSub,
  outerwearSub,
  overallSub,
  topSub,
} from "../../data/apparel-categories";
import {
  uploadToS3API,
  addApparelAPI,
  getAllApparelAPI,
  deleteApparelAPI,
  patchApparelFrequencyAPI,
} from "./wardrobe-api";

export async function uploadToS3Service(imgFormData) {
  const data = await uploadToS3API(imgFormData);
  // data returns object with imageURLs as an array
  // data.imageURLs[0] for now only one image
  const imgURL = data.imageURLs[0];
  return imgURL;
}

export async function addApparelService(apparelData) {
  const apparelItem = await addApparelAPI(apparelData);
  return apparelItem;
}

export async function getAllApparelService() {
  const allApparel = await getAllApparelAPI();
  return allApparel.data.apparel;
}

export async function deleteApparelService(apparelID) {
  await deleteApparelAPI(apparelID);
}

export async function patchApparelFrequencyService(outfitID) {
  await patchApparelFrequencyAPI(outfitID);
}

export function getUniqueCategories(apparel) {
  if (apparel.length === 0) {
    return [];
  }
  const categories = [...new Set(apparel.map((item) => item.mainCategory))];
  const sortCategories = categories.sort(
    (a, b) => findIndexOfCategory(a) - findIndexOfCategory(b)
  );
  return sortCategories;
}

function findIndexOfCategory(category) {
  const order = ["Top", "Bottom", "Outerwear", "Overall"];
  const getIndex = order.indexOf(category);
  return getIndex;
}

// https://stackoverflow.com/questions/43935655/how-to-simplify-multiple-if-statements-javascript
export function checkMainCategory(main) {
  switch (main) {
    case "Top":
      return topSub;
    case "Bottom":
      return bottomSub;
    case "Outerwear":
      return outerwearSub;
    case "Overall":
      return overallSub;
    default:
      return [];
  }
}

export function swalBasicSettings(title, icon) {
  const settings = {
    title: title,
    icon: icon,
    background: "#6B6B6B",
    color: "white",
    confirmButtonColor: "#E50914",
    cancelButtonColor: "#000000",
  };
  return settings;
}
