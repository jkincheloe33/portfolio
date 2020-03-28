import { createGlobalStyle } from 'styled-components';
import resetCSS from './reset';

export { default as theme } from './theme';
export * from './type';
export * from './utils';
export const GlobalStyles = createGlobalStyle`
  body {
    overflow-x: hidden;

    @import url('https://fonts.googleapis.com/css?family=Kanit:400,900&display=swap');
    h1, h2, h3, h4, h5, h6, p, a {
      font-family: 'Kanit', sans-serif;
    }
  }
  #root,
  body,
  html,
  canvas {
    height: 100%;
    width: 100%;
  }
  ${resetCSS}
`;
