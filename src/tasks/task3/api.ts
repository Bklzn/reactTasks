import axios from "axios";
import type { User } from "./types";

export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

export const getUsers = async () => {
  const { data } = await api.get("users");
  return data;
};

export const updateUser = async (user: User) => {
  const { data: updatedUser } = await api.put(`users/${user.id}`, user);
  return updatedUser;
};
