import { apiFetch } from "./api";

export const createVehicle = async (data: any) => {
  return await apiFetch("/vehicles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

export const getMyVehicles = async () => {
  return await apiFetch("/vehicles/get-Vehicle", {
    method: "GET",
  });
};