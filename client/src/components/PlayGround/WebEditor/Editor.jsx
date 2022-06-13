import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { useEffect } from "react";
import ACTIONS from "../../../Actions";
const Editor = props => {
  const { language, displayName, value, onChange, socketRef, roomId } = props;
  const [sync, setSync] = useState([{ code: "" }, { origin: "" }]);
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  const code = sync[0];
  const origin = sync[1];
  useEffect(() => {
    async function init() {
      if (sync[1] !== "setValue") {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
          origin,
        });
      }
    }
    init();
  }, [sync]);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code, origin }) => {
        if (code !== null && origin !== "setValue") {
          onChange(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);
  return (
    <div className={`editor-container`}>
      <div className="center-div">
        <div className="editor-title">{displayName} </div>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
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

export default Editor;
