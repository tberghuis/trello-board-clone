import "./css/reset.css";
import "./css/global.css";
import React from "react";
import Board from "./components/Board";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Heading>Trello Board Clone</Heading>
      <Board></Board>
    </Container>
  );
}

export default App;

const Heading = styled.h1`
  color: white;
  margin: 10px;
  text-align: center;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;