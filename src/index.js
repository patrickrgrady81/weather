import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <>
      <Route exact path="/" component={App} />
      <Route exact path="/weather" component={App} />
      <Route exact path="/profile" component={Profile} />
    </>,
  </Router>,
  document.getElementById('root')
);
