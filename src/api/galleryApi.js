import apiClient from "./apiClient";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const createUserEntry = async (payload) => {
  const response = await apiClient.post("/api/user", payload);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await apiClient.get("/api/users");
  return response.data;
};


