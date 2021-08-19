import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/blog-card.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "mobx-react";
// import { observer, inject} from 'mobx-react';

import UserStore from './helpers/UserStore';

const stores = {
  UserStore
};


window._____APP_STATE_____ = stores;

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App/ >
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
