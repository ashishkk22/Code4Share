import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const userSignUp = createAsyncThunk(
  "auth/signup",
  async ({ toast, dataForm }, { rejectWithValue }) => {
    try {
      const res = await api.userSignUp(dataForm);
      toast.success("Otp sended successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.res.data);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verify",
  async (
    { toast, dataForm, navigate, email, fullHash },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        otp: dataForm.otp,
        email: email,
        fullHash: fullHash,
      };
      const res = await api.userVerify(data);
      toast.success("log in successfully");
      navigate("/");
      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const userSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ toast, dataForm, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.userSignIn(dataForm);
      toast.success("log in successfully");
      navigate("/");
      return res.data.user;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const userChangePass = createAsyncThunk(
  "auth/changePass",
  async ({ toast, dataForm, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.changePass(dataForm);
      toast.success("password changed successfully");
      navigate("/");
      return res.data.user;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const userLogOut = createAsyncThunk(
  "auth/logout",
  async ({ toast, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.logoutUser();
      toast.success("logged out successfully");

      navigate("/");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const userForgotPass = createAsyncThunk(
  "auth/forgotPass",
  async ({ toast, dataForm }, { rejectWithValue }) => {
    try {
      const res = await api.forgotPass(dataForm);
      toast.success("Otp sended successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const forgotPassVerify = createAsyncThunk(
  "auth/forgotPassVerify",
  async (
    { toast, dataForm, email, fullHash, navigate },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        otp: dataForm.otp,
        email: email,
        fullHash: fullHash,
        password: dataForm.password,
      };
      const res = await api.forgotPassVerify(data);
      toast.success("Password reset successfully");
      toast.success("Please log in with new password");
      navigate("/signin");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const isAuthenticated = createAsyncThunk(
  "auth/isAuth",
  async rejectWithValue => {
    try {
      const res = await api.isAuth();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isOtpSent: false,
    email: "",
    fullHash: "",
    error: "",
    authenticated: false,
    loading: false,
    userName: "",
  },
  reducers: {},
  extraReducers: {
    [userSignUp.pending]: (state, action) => {
      state.loading = true;
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
      state.fullHash = action.payload.fullHash;
      state.isOtpSent = true;
    },
    [userSignUp.rejected]: (state, action) => {
      state.loading = false;
    },
    [verifyOtp.pending]: (state, action) => {
      state.loading = true;
    },
    [verifyOtp.fulfilled]: (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
      state.authenticated = true;
      state.fullHash = "";
      state.isOtpSent = false;
      state.userName = action.payload.name;
    },
    [verifyOtp.rejected]: (state, action) => {
      state.loading = false;
      state.isOtpSent = false;
    },
    [userSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [userSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
      state.authenticated = true;
      state.fullHash = "";
      state.isOtpSent = false;
      state.userName = action.payload.name;
    },
    [userSignIn.rejected]: (state, action) => {
      state.loading = false;
    },
    [userChangePass.pending]: (state, action) => {
      state.loading = true;
    },
    [userChangePass.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [userChangePass.rejected]: (state, action) => {
      state.loading = false;
    },
    [userLogOut.pending]: (state, action) => {
      state.loading = true;
    },
    [userLogOut.fulfilled]: (state, action) => {
      state.email = "";
      state.authenticated = false;
      state.loading = false;
      state.userName = "";
    },
    [userLogOut.rejected]: (state, action) => {
      state.loading = false;
    },
    [userForgotPass.pending]: (state, action) => {
      state.loading = true;
    },
    [userForgotPass.fulfilled]: (state, action) => {
      state.email = action.payload.email;
      state.fullHash = action.payload.fullHash;
      state.isOtpSent = true;
      state.loading = false;
    },
    [userForgotPass.rejected]: (state, action) => {
      state.loading = false;
    },
    [forgotPassVerify.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPassVerify.fulfilled]: (state, action) => {
      state.email = "";
      state.fullHash = "";
      state.isOtpSent = false;
      state.loading = false;
    },
    [forgotPassVerify.rejected]: (state, action) => {
      state.loading = false;
    },
    [isAuthenticated.pending]: (state, action) => {
      state.loading = true;
    },
    [isAuthenticated.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.userName = action.payload.user.name;
      state.authenticated = true;
      state.loading = false;
    },
    [isAuthenticated.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
