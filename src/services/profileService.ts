import { apiFetch } from "./api";

export const getMyProfile = async () => {
  return await apiFetch("/auth/me");
};