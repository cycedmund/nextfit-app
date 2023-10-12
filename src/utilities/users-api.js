import sendRequest from "./send-request";

const BASE_URL = "/api/users";

export function signUpAPI(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function loginAPI(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

// export function checkTokenAPI() {
//   return sendRequest(`${BASE_URL}/check-token`);
// }

export async function deleteUserAPI() {
  return sendRequest(BASE_URL, "DELETE");
}
