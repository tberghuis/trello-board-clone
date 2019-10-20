import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { addList } from "../state/boardData";

const AddList = () => {
  const [compose, setCompose] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const onChange = e => {
    setListTitle(e.target.value);
  };
  const refInput = useRef(null);

  useEffect(() => {
    if (compose) {
      refInput.current.focus();
    }
  }, [compose]);

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      // e.preventDefault();
      addList(listTitle);
      setListTitle("");
      setCompose(false);
    }
  };

  const onBlur = () => {
    if (listTitle.length > 0) {
      addList(listTitle);
      setListTitle("");
    }
    setCompose(false);
  };

  return (
    <Container>
      <Wrapper compose={compose}>
        {compose || (
          <Button onClick={() => setCompose(true)}>
            <span className="trellicons">&#xE901;</span>{" "}
            <span>Add another list</span>
          </Button>
        )}
        {compose && (
          <Input
            ref={refInput}
            type="text"
            value={listTitle}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            placeholder="Enter list title..."
          />
        )}
      </Wrapper>
    </Container>
  );
};
export default AddList;

const Container = styled.div`
  width: 272px;
  flex: 0 0 272px;
  /* instead of margin right for overflow-x scroll */
  border-right: 8px solid transparent;
  margin-left: 4px;
`;

const Wrapper = styled.div`
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.compose ? "#ebecf0" : "hsla(0, 0%, 100%, 0.24)"};
  color: #fff;
  &:hover {
    /* alternative to ternary */
    background-color: hsla(0, 0%, 100%, 0.32);
    ${props => props.compose && "background-color: #ebecf0;"}
  }
`;

const Button = styled.div`
  cursor: pointer;
`;

const Input = styled.input`
  border-radius: 3px;
  margin: -4px 0;
  padding: 4px 8px;
  border: none;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: 0;
  }
`;
