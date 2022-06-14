import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apiCompile";
import toast from "react-hot-toast";
export const cppOutput = createAsyncThunk("cpp/output", async () => {
  const code = JSON.parse(localStorage.getItem("code4sharecpp"));
  const input = JSON.parse(localStorage.getItem("code4shareinputCpp"));
  try {
    // var data = Qs.stringify({
    //   code: code,
    //   language: "cpp",
    //   input: input,
    // });
    // console.log("data from the slice", data);
    const res = await api.compileCpp({ input, code, fileName: "main.cpp" });
    console.log(res.data);
    toast.success("Code Compiled successfully");
    return res.data.data;
  } catch (error) {
    toast.error("Opps! error occurred please check the code");
    console.log(error);
  }
});
const compileSlice = createSlice({
  name: "compile",
  initialState: {
    stdout: "",
    stderr: "",
    error: "",
    lanCompiled: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [cppOutput.pending]: (state, action) => {
      state.loading = true;
    },
    [cppOutput.fulfilled]: (state, action) => {
      state.loading = false;
      state.stdout = "";
      state.stderr = "";
      state.error = ""; //clear the error
      state.lanCompiled = "cpp";
      state.stderr = action.payload.stderr;
      state.stdout = action.payload.stdout;
      state.error = action.payload.error;
      // if (state.error === "" && state.output === "") {
      //   state.loading = false;
      // }
    },
    [cppOutput.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {} = compileSlice.actions;

export default compileSlice.reducer;
