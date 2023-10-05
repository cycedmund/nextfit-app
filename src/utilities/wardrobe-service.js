import { uploadToS3API, addApparelAPI, getAllApparelAPI } from "./wardrobe-api";

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
