import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import App from './App';
import Profile from './components/profile/Profile';
import Restaurants from './components/travel/restaurants/Restaurants';
import Events from './components/travel/events/Events';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './index.css';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
        <Route exact path="/"> 
          <App />
        </Route>
        <Route exact path="/weather"> 
          <App />
        </Route>
        <Route exact path="/profile"> 
          <Profile />
        </Route>
        <Route exact path="/restaurants"> 
          <Restaurants />
        </Route>
        <Route exact path="/events"> 
          <Events />
        </Route>
        <Route exact path="/signup"> 
          <Register />
        </Route>
        <Route exact path="/login"> 
          <Login />
        </Route>
        </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
