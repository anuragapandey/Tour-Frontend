import apiClient from "./apiClient";

export const createPaymentOrder = async (payload) => {
  const response = await apiClient.post("/api/payments/create-order", payload);
  return response.data;
};

export const verifyPayment = async (payload) => {
  const response = await apiClient.post("/api/payments/verify", payload);
  return response.data;
};
