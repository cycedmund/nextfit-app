const BASE_URL = "/api/users";

export async function signUpAPI(userData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function loginAPI(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Invalid Login");
  }
}
