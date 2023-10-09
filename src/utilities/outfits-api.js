import sendRequest from "./send-request";

const BASE_URL = "/api/outfits";

export function addOutfitAPI(outfitData) {
  return sendRequest(`${BASE_URL}/new`, "POST", outfitData);
}

export function getAllOutfitAPI() {
  return sendRequest(BASE_URL);
}

export function deleteOutfitAPI(outfitID) {
  return sendRequest(`${BASE_URL}/${outfitID}`, "DELETE");
}
