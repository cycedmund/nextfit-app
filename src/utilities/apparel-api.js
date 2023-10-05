import sendRequest from "./send-request";

const BASE_URL = "/api/apparel";

export function uploadToS3API(imgFormData) {
  return sendRequest(`${BASE_URL}/upload`, "POST", imgFormData, true);
}

export function addApparelAPI(apparelData) {
  return sendRequest(BASE_URL, "POST", apparelData);
}
