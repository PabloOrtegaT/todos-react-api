import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import store from './redux/store';
import { Provider } from 'react-redux' 
 
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUDIENCE;

ReactDOM.render(
  <Auth0Provider 
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}>
      <Provider store={store}>
        <App />
      </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);