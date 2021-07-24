import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    max-width: 800px;
    margin-bottom: 2rem;
  }

  h1 {
    margin-top: 4rem;
    margin-bottom: 3rem;
  }

  h2 {
    margin-top: 3rem;
  }

  h3 {
    margin-top: 2rem;
  }

  p {
    line-height: 1.5;
  }
`;

export default GlobalStyle;
