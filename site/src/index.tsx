import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import store from './store';

function render() {
  const App = require('./components/App').default;
  ReactDOM.render(
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>,
    document.getElementById('root'),
  );
}

render();

/*
 This bit enables Hot Module Replacement (HMR) for the App when in dev/local.
 Any time a component is updated, it's reloaded here without reloading the page.
 */
const devEnv = ['development', 'local'];
if (devEnv.includes(process.env.NODE_ENV) && (module as any).hot) {
  (module as any).hot.accept('./components/App', render);
}
