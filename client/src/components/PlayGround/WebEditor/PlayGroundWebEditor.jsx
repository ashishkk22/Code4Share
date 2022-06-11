import React, { useState, useEffect, useRef } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { initialCSS, initialHTML, initialJS } from "../initialValues";
import { initSocket } from "../../../socket";
import { toast } from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../../../Actions";
import Temp from "../../temp/Temp";
import EditorHtml from "./Editors/EditorHtml";
import EditorCss from "./Editors/EditorCss";
import EditorJavascript from "./Editors/EditorJavascript";
const PlayGround = () => {
  const [html, setHtml] = useLocalStorage("html", initialHTML);
  const [css, setCss] = useLocalStorage("css", initialCSS);
  const [js, setJs] = useLocalStorage("js", initialJS);
  const [srcDoc, setSrcDoc] = useState("");
  const reactNavigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const [avatars, setAvatars] = useState([]);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
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
          console.log("usereffect called");
          setAvatars(clients);
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
  console.log("PlayGround Editor is called");
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(` <html>
   <body>${html}</body>
   <style>${css}</style>
    <script>${js}</script>
   </html>`);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [html, css, js]);
  return (
    <>
      <div>
        <div className="pane top-pane">
          <EditorHtml
            value={html}
            onChange={setHtml}
            socketRef={socketRef}
            roomId={roomId}
          />
          <EditorCss
            value={css}
            onChange={setCss}
            socketRef={socketRef}
            roomId={roomId}
          />
          <EditorJavascript
            value={js}
            onChange={setJs}
            socketRef={socketRef}
            roomId={roomId}
          />
        </div>
        <div className="pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div>
        <Temp roomId={roomId} clients={avatars} />
      </div>
    </>
  );
};

export default PlayGround;
