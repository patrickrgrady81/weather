import React, { Component } from 'react'
import './App.css';
import Search from "./components/search/Search"

export default class App extends Component {
  constructor() { 
    super();

    this.state = {}
  }
  render = () => {
    return (
      <div className="App">
        <Search />
        <h1>Weather</h1>
      </div>
    );
  }
}
