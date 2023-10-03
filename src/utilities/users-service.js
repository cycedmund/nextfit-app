import { signUpAPI, loginAPI, checkTokenAPI } from "./users-api";

export async function signUpService(userData) {
  const token = await signUpAPI(userData);
  localStorage.setItem("token", token);
  // return token;
  return getUser();
}

export async function loginService(credentials) {
  const token = await loginAPI(credentials);
  localStorage.setItem("token", token);
  // return token;
  return getUser();
}

export async function logOutService() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function checkTokenService() {
  return checkTokenAPI().then((dateStr) => new Date(dateStr));
}
