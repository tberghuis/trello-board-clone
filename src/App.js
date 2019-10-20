import "./css/reset.css";
import "./css/global.css";
import React from "react";
import Board from "./components/Board";
import styled from "styled-components";
import github from "./img/github.png";

function App() {
  return (
    <Container>
      <Heading>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/tberghuis/trello-board-clone"
        >
          <img src={github} alt="Github" />
        </a>
        <span>Trello Board Clone</span>
      </Heading>
      <Board></Board>
    </Container>
  );
}

export default App;

const Heading = styled.div`
  font-family: roboto;
  color: white;
  margin: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 40px;
  position: relative;
  & img {
    position: absolute;
    background-color: white;
    left: 0;
    top: 0;
    border-radius: 3px;
    height: 40px;
    width: 40px;
    padding: 3px;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
