import styled from "styled-components";

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  left: 5px;
  top: 20%;
  width: 15vw;
  height: 20vh;
  background: lightgreen;
  border-radius: 20px;
  padding: 5px;
  z-index: 2;
`;

export function Info({ lives, level, onGameOn, gameOn }) {
  return (
    <StyledInfo>
      <p>Lives: {lives}</p>
      <button onClick={onGameOn} disabled={gameOn ? true : false}>
        Start Playing
      </button>
      {level < 2 ? (
        <h3>Current Level: {level + 1}</h3>
      ) : (
        <h3>Congratulations!</h3>
      )}
    </StyledInfo>
  );
}
