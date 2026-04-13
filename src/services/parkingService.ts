import { apiFetch } from "./api";

export const getParkings = async (query = "") => {
  return await apiFetch(`/parkings/search${query}`);
};