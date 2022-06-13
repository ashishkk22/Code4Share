import React, { useState, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { useEffect } from "react";
import ACTIONS from "../../../../Actions";
import "./PythonPlayGround.css";
import { Button, Fab } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
const PythonLanEditor = props => {
  const lan = "python";
  const { value, onChange, socketRef, roomId, onCodeSubmit } = props;
  const [sync, setSync] = useState([{ code: "" }, { origin: "" }]);
  const code = sync[0];
  const origin = sync[1];
  useEffect(() => {
    async function init() {
      if (sync[1] !== "setValue") {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
          origin,
          lan,
        });
      }
    }
    init();
  }, [sync[0]]);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(
        ACTIONS.CODE_CHANGE,
        ({ code, origin, lan, Main }) => {
          if (Main === "code4share" && lan === "python") {
            onChange(code);
          }
          if (origin) {
            if (code !== null && origin != "setValue" && lan === "python") {
              onChange(code);
            }
          }
        }
      );
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);
  return (
    <div className={`editor-container`}>
      <div className="center-div">
        <div className="editor-tt">Python PlayGround</div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#e5b962",
            },
          }}
          onClick={onCodeSubmit}
        >
          <PlayArrow sx={{ mr: 1 }} />
          RUN
        </Button>
      </div>
      <ControlledEditor
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: "python",
          lineNumbers: true,
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
        }}
        onChange={(editor, value) => {
          const { origin } = value;
          const code = editor.getValue();
          setSync([code, origin]);
        }}
      />
    </div>
  );
};

export default PythonLanEditor;
