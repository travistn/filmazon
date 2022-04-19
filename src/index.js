import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import './index.css';

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
