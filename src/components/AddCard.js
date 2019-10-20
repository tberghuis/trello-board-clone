import React, { useState } from "react";
import styled from "styled-components";
import { addCard } from "../state/boardData";
import AutoSizeTextArea from "./AutoSizeTextArea";

const AddCard = ({ listId }) => {
  const [compose, setCompose] = useState(false);

  if (!compose) {
    return (
      <Link onClick={() => setCompose(true)}>
        <span className="trellicons">&#xE901;</span>{" "}
        <span>Add another card</span>
      </Link>
    );
  }

  const onSave = content => {
    addCard(listId, content);
    setCompose(false);
  };

  const cancel = () => {
    setCompose(false);
  };

  return (
    <Wrapper>
      <AutoSizeTextArea
        onSave={onSave}
        updateValue=""
        onBlur={cancel}
        editMode={true}
        placeholder="Enter a title for this card…"
      ></AutoSizeTextArea>
    </Wrapper>
  );
};
export default AddCard;

const Link = styled.div`
  cursor: pointer;
  padding: 8px;
  &:hover span:last-child {
    text-decoration: underline;
  }
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

const Wrapper = styled.div`
  padding: 8px;
`;
