https://tberghuis.github.io/trello-board-clone
## Description
This project is a clone of a single trello board built with the javascript library react-beautiful-dnd. Link to the live app [here](https://tberghuis.github.io/trello-board-clone).

![Screenshot](https://raw.githubusercontent.com/tberghuis/trello-board-clone/master/screenshot.png)

## Purpose
This project was created to gain experience and demonstrate my skills working with React.js

## Features
- [x] Auto sizing textareas
- [x] Drag and drop lists and cards
- [x] Autosave and load from browser storage
- [x] CRUD lists and cards

## Implementation
App state is represented by single object `boardData`. Each state change to boardData will be emitted by rxjs Subject `boardDataSubject`. The `Board` react component uses hooks setState and useEffect to subscribe to boardData changes which it then passes to child react components through props.
App state is persisted in browser storage using library localForage.

## Libraries used
react, react-beautiful-dnd, styled-components, localforage, rxjs