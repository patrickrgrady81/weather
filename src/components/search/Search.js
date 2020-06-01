import React, { Component } from 'react'
import "./Search.css"
import { connect } from 'react-redux';

class Search extends Component { 
  constructor(props) { 
    super(props);
    this.state = {
      searchValue: ""
    }
    // console.log(props);
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
    this.props.updateCity(this.state.searchValue);
    // this.props.run();
  }
}

const mapStateToProps = state => {
  return {
    city: state.city
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCity: (city) => dispatch({ type: 'UPDATE_CITY', city })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);