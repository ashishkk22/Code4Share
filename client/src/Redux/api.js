import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  crossorigin: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const userSignUp = data => API.post("/user/signup", data);
export const userVerify = data => API.post("/user/verify", data);
export const userSignIn = data => API.post("/user/signin", data);
export const changePass = data => API.post("/user/changePass", data);
export const logoutUser = data => API.get("/user/logout", data);
export const forgotPass = data => API.post("/user/resetPass", data);
export const forgotPassVerify = data => API.post("/user/resetPassVerify", data);
export const isAuth = data => API.get("/user/isAuth", data);
