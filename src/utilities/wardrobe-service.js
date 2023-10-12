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
  updateApparelAPI,
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
  return apparelItem.data.apparel;
}

export async function getAllApparelService() {
  const allApparel = await getAllApparelAPI();
  return allApparel.data.apparel;
}

export async function deleteApparelService(apparelID, mainCategory) {
  await deleteApparelAPI(apparelID, mainCategory);
}

export async function patchApparelFrequencyService(apparelIDs) {
  const update = await patchApparelFrequencyAPI(apparelIDs);
  return update.data;
}

export async function updateApparelService(apparelID, apparelData) {
  const result = await updateApparelAPI(apparelID, apparelData);
  return result.data.apparel;
}

export function getUniqueCategories(apparel) {
  if (apparel.length === 0) {
    return [];
  } else {
    const mainCategoriesSet = [
      ...new Set(apparel.map((item) => item.mainCategory)),
    ];
    // const subCategories = [...new Set(apparel.map((item) => item.subCategory))];
    const mainCategories = mainCategoriesSet.sort(
      (a, b) => findIndexOfCategory(a) - findIndexOfCategory(b)
    );
    return mainCategories;
  }
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

export function filterByCategory(apparel, mainCategory, selectSubCategory) {
  const result = apparel
    .filter((item) => item.mainCategory === mainCategory)
    .filter(
      (item) => !selectSubCategory || item.subCategory === selectSubCategory
    );

  console.log("result", result);
  return result;
}

export function sortByWornFreq(apparel, freqOrder) {
  return apparel.sort((a, b) => {
    if (freqOrder === "High-to-Low") {
      return b.wornFrequency - a.wornFrequency;
    }
    return a.wornFrequency - b.wornFrequency;
  });
}

export function filterByCategoryAndFreq(apparel, freqOrder) {
  return apparel.filter((item) => {
    if (freqOrder === "Not Worn Yet") {
      return item.wornFrequency === 0;
    } else if (freqOrder === "Worn Occasionally (1-5)") {
      return item.wornFrequency >= 1 && item.wornFrequency <= 5;
    } else if (freqOrder === "Worn Frequently (>5)") {
      return item.wornFrequency > 5;
    } else {
      return true;
    }
  });
}
