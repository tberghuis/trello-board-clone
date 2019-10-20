import localforage from "localforage";
import { boardDataSubject } from "./state/boardData";

boardDataSubject.subscribe(boardData => {
  localforage.setItem("boardData", boardData);
});

localforage.getItem("boardData").then(function(boardData) {
  // first time run, populate board with default data
  if (boardData === null) {
    boardDataSubject.next(defaultBoardData);
    return;
  }
  boardDataSubject.next(boardData);
});
// .catch(function(err) {
//   console.log("localforage catch", err);
// });

const defaultBoardData = {
  "5cac8c9e-f91b-438a-9e18-00cea4667ee3": {
    position: 0,
    list_title: "todo",
    cards: {
      "52f8d85a-0196-46f0-96f3-5878846851dd": {
        position: 0,
        card_content: "todo item 1"
      },
      "271beef3-8082-4ec2-aa9b-955944aea405": {
        position: 2,
        card_content: "second todo item"
      }
    }
  },
  "860c2140-f2cd-4e9a-8b82-179137e19b1e": {
    position: 1,
    list_title: "done",
    cards: {
      "63bdd1d2-aa55-4e69-8f98-b345b5b6bdfd": {
        position: 0,
        card_content: "some data here"
      },
      "8c2b284c-babe-48ce-8eed-12d3fed2334a": {
        position: 2,
        card_content: "here is more text"
      },
      "11c54528-b4d5-4142-8069-3f82b91a7a2e": {
        position: 1,
        card_content: "Multi-line card example. Multi-line card example. "
      }
    }
  }
};
