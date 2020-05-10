import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import App from './App';
import configureStore from './store/configureStore';

// todo: init user info from localstorage
const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root'),
);
