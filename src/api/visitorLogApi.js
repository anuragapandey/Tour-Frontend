import apiClient from "./apiClient";

export const createVisitorLog = async (payload) => {
  const response = await apiClient.post("/api/visitor-logs", payload);
  return response.data;
};
