import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './index.css';

ReactDom.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
