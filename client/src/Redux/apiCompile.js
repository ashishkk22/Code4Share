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
export const compileJava = data => API.post("/compile/java", data);
export const compileJavascript = data => API.post("/compile/javascript", data);
export const compilePython = data => API.post("/compile/python", data);
