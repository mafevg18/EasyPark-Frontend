import { apiFetch } from "./api";

export const login = async (username: string, password: string) => {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export const register = async (userData: any) => {
  return await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

export const resetPassword = async (data: {
  email: string | null;
  newPassword: string;
}) => {
  return await apiFetch("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      newPassword: data.newPassword
    })
  });
};