import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/Store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>

    <App />
  </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
