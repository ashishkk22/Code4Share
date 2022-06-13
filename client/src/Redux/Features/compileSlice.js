import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apiCompile";
import toast from "react-hot-toast";
import Qs from "qs";
export const cppOutput = createAsyncThunk("cpp/output", async () => {
  const code = JSON.parse(localStorage.getItem("code4sharecpp"));
  const input = JSON.parse(localStorage.getItem("code4shareinputCpp"));
  try {
    var data = Qs.stringify({
      code: code,
      language: "cpp",
      input: input,
    });
    console.log("data from the slice", data);
    const res = await api.compileCpp(data);
    console.log(res, "asdfsdfsjfashjkufahjksfhksf");
    console.log(res.data);
    toast.success("Code Compiled successfully");
    return res.data;
  } catch (error) {
    toast.error("Opps! error occurred please check the code");
    console.log(error);
  }
});
const compileSlice = createSlice({
  name: "compile",
  initialState: {
    output: "",
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [cppOutput.pending]: (state, action) => {
      state.loading = true;
    },
    [cppOutput.fulfilled]: (state, action) => {
      state.loading = false;
      state.output = "";
      state.error = ""; //clear the error
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.output = action.payload.output;
      }
      if (state.error === "" && state.output === "") {
        state.loading = false;
      }
    },
    [cppOutput.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {} = compileSlice.actions;

export default compileSlice.reducer;
