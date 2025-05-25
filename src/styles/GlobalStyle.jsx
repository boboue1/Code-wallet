// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
    color: #333333;
  }

  button, input, textarea {
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyle;
