import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import JavaLanEditor from "./JavaLanEditor";
import "./JavaPlayGround.css";
import SideDrawer from "../../../SideDrawer/SideDrawer";
import ACTIONS from "../../../../Actions";
import { initSocket } from "../../../../socket";
import { initialJava } from "../../initialValues";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import "./JavaPlayGround.css";
import InputEditor from "./Ip_Op_Editor/InputEditor";
import OutputEditor from "./Ip_Op_Editor/OutputEditor";
import { useDispatch } from "react-redux";
import { cppOutput } from "../../../../Redux/Features/compileSlice";
const JavaPlayGround = () => {
  const [input, setInput] = useLocalStorage("inputJava", "");
  const [java, setJava] = useLocalStorage("java", initialJava);
  const reactNavigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const [avatars, setAvatars] = useState([]);
  const handleSubmitCode = () => {
    dispatch(cppOutput({ java, input }));
    // console.log("cpp code", cpp, input);
  };
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      console.log("socketRef.current", socketRef.current);
      socketRef.current.on("connect_error", err => handleErrors(err));
      socketRef.current.on("connect_failed", err => handleErrors(err));
      function handleErrors(e) {
        console.log("socket error", e);
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
          const newJava = JSON.parse(localStorage.getItem("code4sharejava"));
          const newJavaInput = JSON.parse(
            localStorage.getItem("code4shareinputJava")
          );
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: newJava,
            lan: "java",
          });
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: newJavaInput,
            lan: "inputJava",
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
    console.log("useEffect is called");
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
          <JavaLanEditor
            value={java}
            onChange={setJava}
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
          <OutputEditor />
        </div>
      </div>
      <div>
        <SideDrawer roomId={roomId} clients={avatars} />
      </div>
    </>
  );
};

export default JavaPlayGround;