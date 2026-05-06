import axios from "axios";

const API = axios.create({
  baseURL: "https://refreshing-elegance-production-fb88.up.railway.app"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.authorization = token;
  return req;
});

export default API;