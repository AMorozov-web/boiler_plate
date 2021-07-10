import React from 'react';
import ReactDOM from 'react-dom';
import {createGlobalStyle} from 'styled-components';
import {normalize} from 'styled-normalize';
import {App} from './components/app/app';

const GlobalStyle = createGlobalStyle`
  ${normalize}
`;

ReactDOM.render(
    <>
      <GlobalStyle />
      <App />
    </>,
    document.querySelector(`#app`)
);
