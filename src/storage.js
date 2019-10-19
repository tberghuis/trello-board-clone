import localforage from "localforage";
import { boardDataSubject } from "./state/boardData";
import uuid from "uuidv4";

boardDataSubject.subscribe(boardData => {
  localforage.setItem("boardData", boardData);
});

localforage
  .getItem("boardData")
  .then(function(boardData) {
    // console.log("localforage then", boardData);

    // first time run, populate board with default data
    if (boardData === null) {
      boardDataSubject.next(defaultBoardData);
      return;
    }

    boardDataSubject.next(boardData);
  })
  .catch(function(err) {
    console.log("localforage catch", err);
  });

const defaultBoardData = {
  "5cac8c9e-f91b-438a-9e18-00cea4667ee3": {
    position: 0,
    list_title: "list title 0",
    cards: {
      "90a74fbb-0bde-4d1e-b172-ddee2857d6bd": {
        position: 0,
        card_content: "card content 0"
      },
      "52f8d85a-0196-46f0-96f3-5878846851dd": {
        position: 1,
        card_content: "card content 1"
      },
      "d61036f5-7c1f-4563-b91f-20856f73c018": {
        position: 2,
        card_content: "card content 2"
      }
    }
  },
  "e76e7044-be79-4d02-a9c7-d76cf0139470": {
    position: 2,
    list_title: "list title 1",
    cards: {
      "f85672b7-3704-4f66-977d-9fbf44557c9b": {
        position: 0,
        card_content: "card content 3"
      },
      "76410d16-1fd3-43b2-8350-a5758ee0c4f4": {
        position: 1,
        card_content: "card content 4"
      }
    }
  },
  "860c2140-f2cd-4e9a-8b82-179137e19b1e": {
    position: 1,
    list_title: "list title 2",
    cards: {
      "9afa5554-772b-4909-a6cf-9b52a8177072": {
        position: 0,
        card_content: "card content 5"
      },
      "b1206375-b007-4865-b39c-9be55e79774d": {
        position: 1,
        card_content: "card content 6"
      },
      "6d886884-647b-4147-b1b2-a4316c442caf": {
        position: 2,
        card_content: "card content 7"
      }
    }
  }
};
