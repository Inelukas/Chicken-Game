import styled from "styled-components";

const StyledFooter = styled.footer`
  display: grid;
  place-content: center;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 10%;
  background: darkgreen;
  color: white;
  z-index: 2;
`;

export function Footer({ level }) {
  return (
    <StyledFooter>
      <h2>Current Level: {level}</h2>
    </StyledFooter>
  );
}
