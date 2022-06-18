import React, { useState, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { useEffect } from "react";
// import "../CPP/CppPlayGround.css";
import { CircularProgress, Backdrop } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import "./Ip_Op_Editor.css";
import { useSelector } from "react-redux";
import ACTIONS from "../../../../../Actions";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import { initialOutput } from "../../../initialValues";
const OutputEditor = props => {
  const { roomId, socketRef } = props;
  const [editorOutput, setEditorOutput] = useLocalStorage(
    "outputCpp",
    initialOutput
  );
  const { stderr, stdout, error, loading } = useSelector(state => ({
    ...state.compile,
  }));
  const lan = "outputCpp";
  useEffect(() => {
    async function init() {
      socketRef.current.emit(ACTIONS.OUTPUT_CHANGE, {
        roomId,
        stderr,
        stdout,
        lan,
      });
    }

    init();
    if (stdout !== "") {
      setEditorOutput(stdout);
    } else {
      setEditorOutput(stderr);
    }
  }, [stderr, stdout]);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.OUTPUT_CHANGE, ({ stderr, stdout, lan }) => {
        if (lan === "outputCpp") {
          if (stdout !== "" && stdout !== undefined) {
            setEditorOutput(stdout);
          } else if (stderr !== "" && stderr !== undefined) {
            setEditorOutput(stderr);
          }
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.OUTPUT_CHANGE);
    };
  }, [socketRef.current]);
  return (
    <div className={`_editor-container`}>
      <div className="_center-div">
        <div className="_editor-tt">Output</div>
      </div>
      <ControlledEditor
        value={editorOutput}
        className="_code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          lineNumbers: true,
          theme: "dracula",
        }}
      />
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="primary_text" />
        </Backdrop>
      </div>
    </div>
  );
};

export default OutputEditor;
