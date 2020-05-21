import React, { Component } from 'react'
import "./Search.css"

export default class Search extends Component { 
  constructor(props) { 
    super(props);
    this.state = {
      searchValue: ""
    }
  }
  
  render = () => {
    return (
      <div className="search">
        <h3 className="search-h2">Search</h3>
        <input type="text" placeholder="Your City" onChange={this.changer} value={this.state.searchValue}></input>
        <button className="go" onClick={this.clicker}>Go</button>
      </div>
    )
  }

  changer = (e) => { 
    this.setState({searchValue: e.target.value});
  }

  clicker = (e) => { 
    e.preventDefault();
    this.props.setCity(this.state.searchValue);
  }
}