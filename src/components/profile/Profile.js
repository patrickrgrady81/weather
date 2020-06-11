import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/Nav';
import "./Profile.css";

class Profile extends Component {
  render = () => {
    return (
      <div className="settings">
        <Nav />
        <h1>Welcome {`${this.props.email}`}</h1> {/* username */}
        
        {/* what default City? */}
        {/* Show Current? */}
        {/* Show 12 Hour? */}
        {/* Show 10 Day? */}
      </div>
    )
  }
}


const mapStateToProps = state => { 
  return {
    loggedIn: state.loggedIn,
    email: state.email
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateCity: (city) => dispatch({ type: 'UPDATE_CITY', city })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);