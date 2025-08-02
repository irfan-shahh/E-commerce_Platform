import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import {Provider }from 'react-redux'
import DataProvider from './context/DataProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <DataProvider>

    <App />
    </DataProvider>
  </React.StrictMode>
   </Provider>
);

reportWebVitals();
