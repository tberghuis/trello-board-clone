import React, { useState, useEffect } from "react";
import {
  boardDataSubject,
  reorderListPosition,
  reorderCardPosition
} from "../state/boardData";
import List from "./List";
import AddList from "./AddList";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const sortFn = data => (a, b) => {
  return data[a].position - data[b].position;
};

const Board = () => {
  const [boardData, setBoardData] = useState(null);
  useEffect(() => {
    const sub = boardDataSubject.subscribe(bd => setBoardData(bd));
    return () => sub.unsubscribe();
  }, []);

  if (!boardData) {
    return <div>loading</div>;
  }

  const onBeforeDragStart = tmp => {
    console.log("onBeforeDragStart");
    if (document.activeElement.tagName.toUpperCase() === "TEXTAREA") {
      console.log("here");
      document.activeElement.blur();
    }
  };

  const listIds = Object.keys(boardData).sort(sortFn(boardData));

  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {listIds.map(id => {
              return (
                <List
                  key={id}
                  listId={id}
                  listData={boardData[id]}
                ></List>
              );
            })}
            {provided.placeholder}
            <AddList></AddList>
          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Board;

const BoardContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  height: 100%;
  display: flex;
`;

const onDragStart = tmp => {
  // console.log("TCL: onDragStart -> tmp", tmp);
};

const onDragEnd = result => {
  console.log("TCL: result", result);
  // TODO: reorder our column

  // dropped nowhere
  if (!result.destination) {
    return;
  }
  const source = result.source;
  const destination = result.destination;
  // did not move anywhere - can bail early
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  if (result.type === "COLUMN") {
    reorderListPosition(source.index, destination.index);
    return;
  }

  reorderCardPosition(source, destination, result.draggableId);
};
