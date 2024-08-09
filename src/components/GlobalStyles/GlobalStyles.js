import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --primary-color: #D1E8E2;
    --secondary-color: #D9B08C;
    --tertiary-color: #FFCB9A;
    --side-color: #116466;
    --text-color: #000000;
    --text-color-2: #2C3531;
    --icon-color: none;
    --custom-image: url("https://www.transparenttextures.com/patterns/always-grey.png")
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
    color: var(--text-color);
  }


`;
