import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { Controlled as ControlledEditor } from "react-codemirror2";
const JavaLanguage = props => {
  const { language, displayName, value, onChange } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
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
      />
    </div>
  );
};

export default JavaLanguage;
