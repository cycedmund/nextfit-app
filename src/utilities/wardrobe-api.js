import sendRequest from "./send-request";

const BASE_URL = "/api/wardrobe";

export function uploadToS3API(imgFormData) {
  return sendRequest(`${BASE_URL}/new/upload`, "POST", imgFormData, true);
}

export function addApparelAPI(apparelData) {
  return sendRequest(`${BASE_URL}/new`, "POST", apparelData);
}

export function getAllApparelAPI() {
  return sendRequest(BASE_URL);
}

export function deleteApparelAPI(apparelID, mainCatgeory) {
  return sendRequest(`${BASE_URL}/${apparelID}/${mainCatgeory}`, "DELETE");
}

export function patchApparelFrequencyAPI(outfitID) {
  return sendRequest(`${BASE_URL}/frequency`, "PATCH", outfitID);
}

export function updateApparelAPI(apparelID, apparelData) {
  return sendRequest(`${BASE_URL}/${apparelID}/edit`, "PATCH", apparelData);
}
