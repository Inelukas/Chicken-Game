import { Matrix } from "./components/Matrix/Matrix";
import { GlobalStyle } from "./components/GlobalStyles/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { Info } from "./components/Info/Info";

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [level, setLevel] = useState(2);
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
    setLost(true);
  }

  function handleWon() {
    setWon(true);
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Info
        lives={lives}
        level={level}
        onGameOn={handleGameOn}
        gameOn={gameOn}
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
        />
      ) : (
        <div
          style={{
            height: "100vh",
            display: "grid",
            placeContent: "center",
            fontSize: "70px",
          }}
        >
          {lost ? "🐓Game Over🐓" : "Game Won 🌝"}
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
