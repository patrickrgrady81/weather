import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import "./Nav.css"

class Nav extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      searchValue: ""
    }
  }

  render = () => { 
    return (
      <div>
        <nav>
          <h2 className="nav-city">{this.props.city}</h2>
          <form className="nav-form" onSubmit={this.go}>
            <input className="nav-input" type="text" placeholder="Search City"
                   onChange={this.changer} value={this.state.searchValue}></input>
            <button className="nav-btn" onClick={this.go}>Go</button>
          </form>
          <ul className="nav-pages">
            <li><Link to="/weather">Weather</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul >
          <ul className="nav-log">
            {this.getLog()}
          </ul>
        </nav>
      </div>
    )
  }
  
  getLog = () => { 
    if (this.props.loggedIn === false) { 
      return (
        <>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </>
      )
    } else {
      return (
        <>
          <li><Link to="/profile">{this.props.email}</Link></li>
        </>
      )
    }
  }

  changer = (e) => { 
    this.setState({searchValue: e.target.value});
  }

  go = (e) => { 
    e.preventDefault();
    this.props.updateCity(this.state.searchValue);
    // this.props.run();
  }
}

const mapStateToProps = state => { 
  return {
    loggedIn: state.loggedIn,
    city: state.city,
    email: state.email
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateCity: (city) => dispatch({ type: 'UPDATE_CITY', city })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);