import axios from "axios";
const API = axios.create({
  baseURL: "https://codex-api.herokuapp.com/",
  crossorigin: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const compileCpp = data => API.post("/", data);
