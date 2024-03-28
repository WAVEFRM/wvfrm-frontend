import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css';

import App from './App';

let clientId=process.env.REACT_APP_GOOGLE_API_TOKEN;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId="341039341739-ch6e1f3airvkjft8jv2egcikjhpt43rd.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
</BrowserRouter>
);