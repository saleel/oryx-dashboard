import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AuthContextProvider } from './contexts/auth-context';
import { StoreContextProvider } from './contexts/store-context';
// import * as serviceWorker from './serviceWorker';


ReactDOM.render((
  <AuthContextProvider>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </AuthContextProvider>
), document.getElementById('root'));


// serviceWorker.register();
