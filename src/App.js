import { Matrix } from "./components/Matrix/Matrix";
import { GlobalStyle } from "./components/GlobalStyles/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { Info } from "./components/Info/Info";
import styled from "styled-components";

const StyledBox = styled.div`
  .after-play {
    height: 100vh;
    width: 100vw;
    display: grid;
    place-content: center;

    h1 {
      font-size: 100px;

      @media (max-width: 1200px) {
        font-size: 50px;
      }
    }
  }
`;

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [level, setLevel] = useState(0);
  const [lives, setLives] = useState(3);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  function handleGameOn() {
    setGameOn(!gameOn);
  }

  function handleLevelClear() {
    setLevel(level + 1);
  }

  function handleLoseLife() {
    setLives(lives - 1);
    handleGameOn();
  }

  function handleLost() {
    setLost(!lost);
  }

  function handleWon() {
    setWon(true);
  }

  function handleNewGame() {
    setLost(false);
    setLevel(0);
    setLives(3);
    setGameOn(false);
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <StyledBox>
        <Info
          lives={lives}
          level={level}
          onGameOn={handleGameOn}
          gameOn={gameOn}
          onNewGame={handleNewGame}
        />
        {!lost && !won ? (
          <Matrix
            gameOn={gameOn}
            level={level}
            lives={lives}
            onLevelClear={handleLevelClear}
            onLoseLife={handleLoseLife}
            onGameOn={handleGameOn}
            onLost={handleLost}
            onWon={handleWon}
            lost={lost}
            won={won}
            onLevel={setLevel}
          />
        ) : (
          <div className="after-play">
            {lost ? <h1>🐓Game Over🐓</h1> : <h1>Game Won 🌝</h1>}
          </div>
        )}
      </StyledBox>
      <Footer />
    </>
  );
}

export default App;
