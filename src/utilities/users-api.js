const BASE_URL = "/api/users";

export async function signUpAPI(formData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}
