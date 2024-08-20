import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    background: green;
    font-size: 16px;

    @media (max-width: 1200px) {
      font-size: 15px;
    }

    @media (max-width: 900px) {
      font-size: 14px;
    }

    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
`;
