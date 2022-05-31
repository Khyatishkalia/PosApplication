import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode> 
  /* <h1>Hello   {2 + 5}</h1> */,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
