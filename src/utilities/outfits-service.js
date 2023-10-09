import {
  addOutfitAPI,
  getAllOutfitAPI,
  deleteOutfitAPI
} from "./outfits-api";


export async function addOutfitService(outfitData) {
  const outfitItem = await addOutfitAPI(outfitData);
  return outfitItem;
}

export async function getAllOutfitService() {
  const allOutfits = await getAllOutfitAPI();
  return allOutfits.data.apparel;
}

export async function deleteOutfitService(outfitID) {
  await deleteOutfitAPI(outfitID);
}