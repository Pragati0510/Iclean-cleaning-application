import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Auth0Provider } from "@auth0/auth0-react";
const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-ydjctw1ymz8e47sa.us.auth0.com"
    clientId="isSFGUUZVBDx4tPWOktJsX8ZHph9FLyy"
    redirectUri={'http://localhost:3000'}
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

