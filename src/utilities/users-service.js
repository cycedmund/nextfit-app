import { signUpAPI } from "./users-api";

export async function signUpService(formData) {
  const token = await signUpAPI(formData);
  localStorage.setItem("token", token);
  // return token;
  return getUser();
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
