import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import PythonLanEditor from "./PythonLanEditor";
import "./PythonPlayGround.css";
import SideDrawer from "../../../SideDrawer/SideDrawer";
import ACTIONS from "../../../../Actions";
import { initSocket } from "../../../../socket";
import { initialPython } from "../../initialValues";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import InputEditor from "./Ip_Op_Editor/InputEditor";
import OutputEditor from "./Ip_Op_Editor/OutputEditor";
import { useDispatch } from "react-redux";
import { pythonOutput } from "../../../../Redux/Features/compileSlice";
const PythonPlayGround = () => {
  const [input, setInput] = useLocalStorage("inputPython", "");
  const [python, setPython] = useLocalStorage("python", initialPython);
  const reactNavigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const [avatars, setAvatars] = useState([]);
  const handleSubmitCode = () => {
    dispatch(pythonOutput({ python, input }));
  };
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", err => handleErrors(err));
      socketRef.current.on("connect_failed", err => handleErrors(err));
      function handleErrors(e) {
        toast.error("Socket connection failed, Try again later");
        reactNavigate("/");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
      //Listening for the joined  event from the server
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
          }
          setAvatars(clients);
          const newPython = JSON.parse(
            localStorage.getItem("code4sharepython")
          );
          const newPythonInput = JSON.parse(
            localStorage.getItem("code4shareinputPython")
          );
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: newPython,
            lan: "python",
          });
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: newPythonInput,
            lan: "inputPython",
          });
          const newPythonOutput = JSON.parse(
            localStorage.getItem("code4shareoutputPython")
          );
          socketRef.current.emit(ACTIONS.OUTPUT_SYNC, {
            socketId,
            stdout: newPythonOutput,
            lan: "outputCpp",
          });
        }
      );
      //Listening for the disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setAvatars(prev => {
          return prev.filter(client => client.socketId !== socketId);
        });
      });
    };
    //whenever we have used the listener we have to remove it due to memory leak problem
    init();
    return () => {
      //disconnecting from actions that are listening to the socket
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect();
    };
  }, []);
  if (!location.state) {
    <Navigate to="/" />;
  }
  return (
    <>
      <div>
        <div className="pane top-pane">
          <PythonLanEditor
            value={python}
            onChange={setPython}
            socketRef={socketRef}
            roomId={roomId}
            onCodeSubmit={handleSubmitCode}
          />
        </div>
        <div className="center_textArea">
          <InputEditor
            value={input}
            onChange={setInput}
            roomId={roomId}
            socketRef={socketRef}
          />
          <OutputEditor roomId={roomId} socketRef={socketRef} />
        </div>
      </div>
      <div>
        <SideDrawer roomId={roomId} clients={avatars} />
      </div>
    </>
  );
};

export default PythonPlayGround;
