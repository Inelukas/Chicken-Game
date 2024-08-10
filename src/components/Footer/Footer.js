import styled from "styled-components";

const StyledFooter = styled.footer`
  display: grid;
  place-content: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 10%;
  background: darkgreen;
  color: white;
  z-index: 2;
`;

export function Footer() {
  return (
    <StyledFooter>
      <h2>Copyright by Lukas Klipp</h2>
    </StyledFooter>
  );
}
