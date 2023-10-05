import sendRequest from "./send-request";

const BASE_URL = "/api/wardrobe";

export function uploadToS3API(imgFormData) {
  return sendRequest(
    `${BASE_URL}/apparel/new/upload`,
    "POST",
    imgFormData,
    true
  );
}

export function addApparelAPI(apparelData) {
  return sendRequest(`${BASE_URL}/apparel/new`, "POST", apparelData);
}

export function getAllApparelAPI() {
  return sendRequest(BASE_URL);
}
