import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Route, Router } from 'react-router-dom';
import { history } from "./routing/history";

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Route component={App}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)