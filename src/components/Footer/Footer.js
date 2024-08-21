import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

export function Footer() {
  return (
    <StyledFooter>
      <h2>Copyright by Lukas Klipp</h2>
    </StyledFooter>
  );
}
