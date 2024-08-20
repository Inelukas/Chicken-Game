import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 10%;
  background: darkgreen;
  z-index: 3;
  text-align: center;

  h1 {
    font-size: 2rem;
    color: white;

    @media (max-width: 900px) {
      font-size: 1.5rem;
    }

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;

export function Header() {
  return (
    <StyledHeader>
      <h1>Chicken-Game</h1>
    </StyledHeader>
  );
}
