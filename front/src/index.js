import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Travel from './components/travel/Travel';
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <>
        <Route exact path="/" component={App} />
        <Route exact path="/weather" component={App} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/travel" component={Travel} />
      </>,
    </Router>
  </Provider>,
  document.getElementById('root')
);
