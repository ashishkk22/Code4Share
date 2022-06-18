import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apiCompile";
import toast from "react-hot-toast";
export const cppOutput = createAsyncThunk("cpp/output", async () => {
  const code = JSON.parse(localStorage.getItem("code4sharecpp"));
  const input = JSON.parse(localStorage.getItem("code4shareinputCpp"));
  try {
    const res = await api.compileCpp({ input, code, fileName: "main.cpp" });
    toast.success("Code Compiled successfully");
    return res.data.data;
  } catch (error) {
    toast.error("Opps! error occurred please check the code");
    return { stderr: "", error: "", stdout: "please check the code" };
  }
});
export const javaOutput = createAsyncThunk("cpp/output", async () => {
  const code = JSON.parse(localStorage.getItem("code4sharejava"));
  const input = JSON.parse(localStorage.getItem("code4shareinputJava"));
  try {
    const res = await api.compileJava({ input, code, fileName: "Main.java" });
    toast.success("Code Compiled successfully");
    return res.data.data;
  } catch (error) {
    toast.error("Opps! error occurred please check the code");
    return { stderr: "", error: "", stdout: "please check the code" };
  }
});
export const javascriptOutput = createAsyncThunk("cpp/output", async () => {
  const code = JSON.parse(localStorage.getItem("code4sharejavascript"));
  const input = JSON.parse(localStorage.getItem("code4shareinputJavascript"));
  try {
    const res = await api.compileJavascript({
      input,
      code,
      fileName: "Main.js",
    });
    toast.success("Code Compiled successfully");
    return res.data.data;
  } catch (error) {
    toast.error("Opps! error occurred please check the code");
    return { stderr: "", error: "", stdout: "please check the code" };
  }
});
export const pythonOutput = createAsyncThunk("cpp/output", async () => {
  const code = JSON.parse(localStorage.getItem("code4sharepython"));
  const input = JSON.parse(localStorage.getItem("code4shareinputPython"));
  try {
    const res = await api.compilePython({ input, code, fileName: "Main.py" });
    toast.success("Code Compiled successfully");
    return res.data.data;
  } catch (error) {
    toast.error("Opps! error occurred please check the code");
    return { stderr: "", error: "", stdout: "please check the code" };
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
    },
    [cppOutput.rejected]: (state, action) => {
      state.loading = false;
    },
    [javaOutput.pending]: (state, action) => {
      state.loading = true;
    },
    [javaOutput.fulfilled]: (state, action) => {
      state.loading = false;
      state.stdout = "";
      state.stderr = "";
      state.error = ""; //clear the error
      state.lanCompiled = "java";
      state.stderr = action.payload.stderr;
      state.stdout = action.payload.stdout;
      state.error = action.payload.error;
    },
    [javaOutput.rejected]: (state, action) => {
      state.loading = false;
    },
    [javascriptOutput.pending]: (state, action) => {
      state.loading = true;
    },
    [javascriptOutput.fulfilled]: (state, action) => {
      state.loading = false;
      state.stdout = "";
      state.stderr = "";
      state.error = ""; //clear the error
      state.lanCompiled = "javascript";
      state.stderr = action.payload.stderr;
      state.stdout = action.payload.stdout;
      state.error = action.payload.error;
    },
    [javascriptOutput.rejected]: (state, action) => {
      state.loading = false;
    },
    [pythonOutput.pending]: (state, action) => {
      state.loading = true;
    },
    [pythonOutput.fulfilled]: (state, action) => {
      state.loading = false;
      state.stdout = "";
      state.stderr = "";
      state.error = ""; //clear the error
      state.lanCompiled = "javascript";
      state.stderr = action.payload.stderr;
      state.stdout = action.payload.stdout;
      state.error = action.payload.error;
    },
    [pythonOutput.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {} = compileSlice.actions;

export default compileSlice.reducer;
