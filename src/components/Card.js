import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { updateCard, deleteCard } from "../state/boardData";
import AutoSizeTextArea from "./AutoSizeTextArea";

const Card = ({ listId, cardId, cardData }) => {
  const [editMode, setEditMode] = useState(false);

  const onSave = content => {
    updateCard(listId, cardId, content);
    setEditMode(false);
  };

  const contentClick = () => {
    setEditMode(true);
  };

  const deleteClick = () => {
    deleteCard(listId, cardId);
  };

  return (
    <Draggable
      draggableId={cardId}
      index={cardData.position}
      disableInteractiveElementBlocking={!editMode}
    >
      {(draggableProvided, draggableSnapshot) => (
        <CardDraggable
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          editMode={editMode}
        >
          <TextAreaWrapper onClick={contentClick}>
            <AutoSizeTextArea
              onSave={onSave}
              updateValue={cardData.card_content}
              // should i cancel???
              onBlur={onSave}
              editMode={editMode}
            ></AutoSizeTextArea>
          </TextAreaWrapper>

          <Delete onClick={deleteClick}>&#xE918;</Delete>
        </CardDraggable>
      )}
    </Draggable>
  );
};
export default Card;

// TODO refactor so code shared title and content

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: trellicons;
  border-radius: 3px;
  height: 23px;
  width: 23px;
  line-height: 23px;
  text-align: center;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  visibility: hidden;
  cursor: pointer;
`;

const TextAreaWrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 2px;
  /* padding-right: 36px; */
`;

const CardDraggable = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: ${props =>
    props.editMode ? "none" : "0 2px 4px rgba(2, 2, 2, 0.6)"};
  margin-bottom: 8px;
  position: relative;
  &:hover ${Delete} {
    visibility: visible;
  }
`;
