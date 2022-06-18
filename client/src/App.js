import "./App.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/footer/Footer";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import CssBaseline from "@mui/material/CssBaseline";
import PlayGround from "./components/PlayGround/WebEditor/PlayGroundWebEditor";
import OptionPage from "./components/PlayGround/OptionPage/OptionPage";
import { Toaster } from "react-hot-toast";
import CppPlayGround from "./components/PlayGround/IDEWithDiffLanguage/CPP/CppPlayGround";
import JavaPlayGround from "./components/PlayGround/IDEWithDiffLanguage/Java/JavaPlayGround";
import JavascriptPlayGround from "./components/PlayGround/IDEWithDiffLanguage/Javascript/JavascriptPlayGround";
import PythonPlayGround from "./components/PlayGround/IDEWithDiffLanguage/Python/PythonPlayGround";
import ChangePass from "./components/changePassword/ChangePass";
import ForgotPass from "./components/forgotPass/ForgotPass";
import { useEffect } from "react";
import { isAuthenticated } from "./Redux/Features/authSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => ({ ...state.auth }));
  useEffect(() => {
    if (!authenticated) {
      dispatch(isAuthenticated());
    }
  }, [authenticated]);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: "#ffce6d",
            },
          },
        }}
      ></Toaster>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline enableColorScheme />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route
              path="/playground"
              element={authenticated ? <OptionPage /> : <SignIn />}
            ></Route>
            <Route
              path="/webEditor/:roomId"
              element={authenticated ? <PlayGround /> : <SignIn />}
            ></Route>
            <Route path="/IDEcpp/:roomId" element={<CppPlayGround />}></Route>
            <Route
              path="/IDEjs/:roomId"
              element={authenticated ? <JavascriptPlayGround /> : <SignIn />}
            ></Route>
            <Route
              path="/IDEjava/:roomId"
              element={authenticated ? <JavaPlayGround /> : <SignIn />}
            ></Route>
            <Route
              path="/IDEpy/:roomId"
              element={authenticated ? <PythonPlayGround /> : <SignIn />}
            ></Route>
            <Route
              path="/changePass"
              element={authenticated ? <ChangePass /> : <SignIn />}
            ></Route>
            <Route path="/forgotPass" element={<ForgotPass />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
