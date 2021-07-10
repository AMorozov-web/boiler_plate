import React from 'react';
import ReactDOM from 'react-dom';
import {Normalize} from 'styled-normalize';
import {App} from './components/app/app';

ReactDOM.render(
    <>
      <Normalize />
      <App />
    </>,
    document.querySelector(`#app`)
);
