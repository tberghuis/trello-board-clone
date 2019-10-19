import { boardDataSubject } from "./state/boardData";

if (process.env.NODE_ENV === "development") {
  global.DEV_GLOBAL = {};

  boardDataSubject.subscribe(boardData => {
    global.DEV_GLOBAL.boardData = boardData;
  });
}
