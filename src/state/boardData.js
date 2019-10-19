import { Subject } from "rxjs";
import uuid from "uuidv4";

let boardData = null;

export const boardDataSubject = new Subject();

boardDataSubject.subscribe(_boardData => {
  boardData = _boardData;
});

// TODO I should generalise this function (DRY)
export const reorderListPosition = (initialPosition, finalPosition) => {
  Object.values(boardData).forEach(list => {
    if (list.position === initialPosition) {
      list.position = finalPosition;
      return;
    }
    if (
      list.position < Math.min(initialPosition, finalPosition) ||
      list.position > Math.max(initialPosition, finalPosition)
    ) {
      return;
    }
    if (initialPosition < finalPosition) {
      list.position--;
      return;
    }
    list.position++;
  });

  boardDataSubject.next({ ...boardData });
};

export const reorderCardPosition = (source, destination, cardId) => {
  // moving card within same list
  if (source.droppableId === destination.droppableId) {
    const { cards } = boardData[source.droppableId];
    Object.values(cards).forEach(card => {
      if (card.position === source.index) {
        card.position = destination.index;
        return;
      }
      if (
        card.position < Math.min(source.index, destination.index) ||
        card.position > Math.max(source.index, destination.index)
      ) {
        return;
      }
      if (source.index < destination.index) {
        card.position--;
        return;
      }
      card.position++;
    });
  }
  // moving card between different lists
  else {
    const sourceCards = boardData[source.droppableId].cards;
    const destinationCards = boardData[destination.droppableId].cards;
    const movingCard = boardData[source.droppableId].cards[cardId];
    Object.values(sourceCards).forEach(card => {
      if (card.position > source.index) {
        card.position--;
      }
    });
    Object.values(destinationCards).forEach(card => {
      if (card.position >= destination.index) {
        card.position++;
      }
    });
    delete boardData[source.droppableId].cards[cardId];
    movingCard.position = destination.index;
    boardData[destination.droppableId].cards[cardId] = movingCard;
  }

  boardDataSubject.next({ ...boardData });
};

export const addCard = (listId, content) => {
  const listCards = boardData[listId].cards;
  const position = Object.keys(listCards).length;
  const card = { position, card_content: content };
  boardData[listId].cards[uuid()] = card;

  // refactor to only update changed list for optimisation???
  boardDataSubject.next({ ...boardData });
};

export const updateCard = (listId, cardId, content) => {
  boardData[listId].cards[cardId].card_content = content;
  boardDataSubject.next({ ...boardData });
};

export const addList = listTitle => {
  const position = Object.keys(boardData).length;
  const list = { position, list_title: listTitle, cards: {} };
  boardData[uuid()] = list;
  boardDataSubject.next({ ...boardData });
};

export const updateListTitle = (listId, listTitle) => {
  boardData[listId].list_title = listTitle;
  boardDataSubject.next({ ...boardData });
};

export const deleteList = listId => {
  delete boardData[listId];
  boardDataSubject.next({ ...boardData });
};

export const deleteCard = (listId, cardId) => {
  delete boardData[listId].cards[cardId];
  boardDataSubject.next({ ...boardData });
};
