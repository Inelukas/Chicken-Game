import styled from "styled-components";

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  left: 5px;
  margin: 25% 5%;
  width: 15%;
  height: 20%;
  background: var(--side-color);
  border-radius: 20px;
  padding: 5px;
  z-index: 2;

  .buttons {
    display: flex;
    gap: 15px;
  }

  button {
    padding: 5px;
  }

  @media screen and (max-width: 1200px) {
    transform: scale(0.9);
    bottom: 10%;
    left: 30vw;
    margin: 0%;
    z-index: 3;
    gap: 5px;
    height: 10%;
    width: 40vw;
  }
`;

export function Info({ lives, level, onGameOn, gameOn, onNewGame }) {
  return (
    <StyledInfo>
      <div className="buttons">
        <button onClick={onGameOn} disabled={gameOn ? true : false}>
          Start Playing
        </button>
        <button onClick={onNewGame} disabled={gameOn ? false : true}>
          Play Again
        </button>
      </div>
      <h3>Lives: {lives}</h3>
      {level < 2 ? (
        <h3>Current Level: {level + 1}</h3>
      ) : (
        <h3>Congratulations!</h3>
      )}
    </StyledInfo>
  );
}
