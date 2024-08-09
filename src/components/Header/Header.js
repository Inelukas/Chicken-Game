import styled from "styled-components";

const StyledHeader = styled.header`
  display: grid;
  place-content: center;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 10%;
  background: darkgreen;
  z-index: 2;
`;

export function Header() {
  return (
    <StyledHeader>
      <h1>Chicken-Game</h1>
    </StyledHeader>
  );
}
