import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';
import { isWebApp } from './constants';


ReactDOM.render(<App />, document.getElementById('root'));

if (isWebApp) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
