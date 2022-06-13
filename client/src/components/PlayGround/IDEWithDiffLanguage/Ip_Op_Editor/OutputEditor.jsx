import React, { useState, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { useEffect } from "react";
import ACTIONS from "../../../../Actions";
// import "../CPP/CppPlayGround.css";
import { CircularProgress, Backdrop } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import "./Ip_Op_Editor.css";
import { useSelector } from "react-redux";
const OutputEditor = props => {
  const { loading, error, output } = useSelector(state => ({
    ...state.compile,
  }));
  const [editorOutput, setEditorOutput] = useState("");
  useEffect(() => {
    if (output !== "") {
      setEditorOutput(output);
    } else {
      setEditorOutput(error);
    }
  }, [error, output]);
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
