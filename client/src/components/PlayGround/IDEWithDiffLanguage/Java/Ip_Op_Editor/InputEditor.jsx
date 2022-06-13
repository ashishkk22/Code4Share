import React, { useState, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { useEffect } from "react";
// import ACTIONS from "../../../../Actions";
import "./Ip_Op_Editor.css";
import ACTIONS from "../../../../../Actions";
const InputEditor = props => {
  const lan = "inputJava";
  const { value, onChange, socketRef, roomId } = props;
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
          if (Main === "code4share" && lan === "inputJava") {
            onChange(code);
          }
          if (origin) {
            if (code !== null && origin != "setValue" && lan === "inputJava") {
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
    <div className={`_editor-container`}>
      <div className="_editor-tt">Input</div>
      <ControlledEditor
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
        value={value}
        className="_code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          lineNumbers: true,
          theme: "dracula",
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

export default InputEditor;
