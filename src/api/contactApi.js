import apiClient from "./apiClient";

export const createContactInquiry = async (payload) => {
  const response = await apiClient.post("/api/contact", payload);
  return response.data;
};
