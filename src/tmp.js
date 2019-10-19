import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const TextArea = styled.textarea`
  padding: 2px;
  resize: none;
`;

function App() {
  const [val, setVal] = useState("svsd svsd");
  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  useEffect(resizeTextArea, []);

  const onChange = e => {
    setVal(e.target.value);
    resizeTextArea();
  };

  return (
    <div>
      <TextArea ref={textAreaRef} value={val} onChange={onChange} rows={1} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
