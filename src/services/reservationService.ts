import { apiFetch } from "./api";

export const createReservation = async (data:any) => {
  return await apiFetch("/reservations", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getMyReservations = async () => {
  return await apiFetch("/reservations", {
    method: "GET",
  });
};

export const cancelReservation = async (id: string) => {
  return await apiFetch(`/reservations/${id}`, {
    method: "DELETE",
  });
};