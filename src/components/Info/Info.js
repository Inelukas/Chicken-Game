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
  background: lightgreen;
  border-radius: 20px;
  padding: 5px;
  z-index: 2;

  button {
    padding: 5px;
  }
`;

export function Info({ lives, level, onGameOn, gameOn }) {
  return (
    <StyledInfo>
      <button onClick={onGameOn} disabled={gameOn ? true : false}>
        Start Playing
      </button>
      <h3>Lives: {lives}</h3>
      {level < 2 ? (
        <h3>Current Level: {level + 1}</h3>
      ) : (
        <h3>Congratulations!</h3>
      )}
    </StyledInfo>
  );
}
