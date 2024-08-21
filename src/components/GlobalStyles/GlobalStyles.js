import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
    --primary-color: #387F39;
    --secondary-color: #A2CA71;
    --side-color: #BEDC74;
    --text-color: #000000;
    --custom-image: url("https://www.transparenttextures.com/patterns/axiom-pattern.png");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
background-image: var(--custom-image);
    font-size: 16px;
    overflow: hidden;

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
