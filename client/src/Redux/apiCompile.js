import axios from "axios";
const API = axios.create({
  // baseURL: "https://codex-api.herokuapp.com/",
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  crossorigin: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const compileCpp = data => API.post("/compile/cpp", data);
