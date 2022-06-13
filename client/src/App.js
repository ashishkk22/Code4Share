import logo from "./logo.svg";
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
import CppLanEditor from "./components/PlayGround/IDEWithDiffLanguage/CPP/CppLanEditor";
import JavascriptLanguage from "./components/PlayGround/IDEWithDiffLanguage/Javascript/JavascriptLanguage";
import JavaLanguage from "./components/PlayGround/IDEWithDiffLanguage/Java/JavaLanguage";
import PythonLanguage from "./components/PlayGround/IDEWithDiffLanguage/Python/PythonLanguage";
import CppPlayGround from "./components/PlayGround/IDEWithDiffLanguage/CPP/CppPlayGround";

function App() {
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
            <Route path="/playground" element={<OptionPage />}></Route>
            <Route path="/webEditor/:roomId" element={<PlayGround />}></Route>
            <Route path="/IDEcpp/:roomId" element={<CppPlayGround />}></Route>
            <Route
              path="/IDEjs/:roomId"
              element={<JavascriptLanguage />}
            ></Route>
            <Route path="/IDEjava/:roomId" element={<JavaLanguage />}></Route>
            <Route path="/IDEpy/:roomId" element={<PythonLanguage />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
