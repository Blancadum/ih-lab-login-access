import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const profile = () => {
  return http.get("/users/me");
};

export const login = (data) => {
  return http.post("/sessions", data);
};

export const logout = () => {
  return http.delete("/sessions");
};

export const register = (data) => {
  return http.post("/users", data);
};