import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body {
    height: 100%;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialised;
    background-color: ${({ theme }) => theme['gray-900']};
    color: ${({ theme }) => theme['gray-300']};
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
  }
`
