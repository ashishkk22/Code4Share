import React, { useState, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { useEffect } from "react";
import ACTIONS from "../../../../Actions";
import "../PlayGround.css";
const EditorCss = props => {
  const lan = "css";
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
          if (Main === "code4share" && lan === "css") {
            onChange(code);
          }
          if (origin) {
            if (code !== null && origin != "setValue" && lan === "css") {
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
    <div className={`editor-containerHCJ`}>
      <div className="center-div">
        <div className="editor-title">CSS</div>
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
          mode: "css",
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

export default EditorCss;
