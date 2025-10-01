import api from "../api/axios";

export const adminLogin = async (email, password) => {
  const response = await api.post("/api/admin/login", { email, password });
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post("/api/projects", projectData);
  return response.data;
};
