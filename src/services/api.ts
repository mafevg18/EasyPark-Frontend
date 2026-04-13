const API_URL = "http://localhost:5133/api";

export const apiFetch = async (endpoint: string, options: any = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error en la petición");
  }

  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};