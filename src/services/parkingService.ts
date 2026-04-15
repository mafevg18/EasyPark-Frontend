import { apiFetch } from "./api";

export const getParkings = async (query = "") => {
  return await apiFetch(`/parkings/search${query}`);
};

export const createParking = async (data: any) => {
  return await apiFetch("/parkings", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateParking = async (id:any, data:any) => {
  return await apiFetch(`/parkings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const getMyParkings = async () => {
  return await apiFetch("/parkings/my", {
    method: "GET",
  });
};