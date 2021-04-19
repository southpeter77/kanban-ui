import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import configureStore from "./components/store/configureStore"

const initialState = {}
const store = configureStore(initialState);
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
