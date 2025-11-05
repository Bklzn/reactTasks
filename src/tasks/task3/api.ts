import axios from "axios";
import type { User } from "./types";

export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gorestToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = "";
  }
  return config;
});

export const getUsers = async () => {
  const { data } = await api.get("users");
  return data;
};

export const updateUser = async (user: User) => {
  const { data: updatedUser } = await api.put(`users/${user.id}`, user);
  return updatedUser;
};
