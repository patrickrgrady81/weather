import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from "../nav/Nav"
import './Travel.css';


class Travel extends Component {

  render = () => {
    return (
      <>
        <Nav />
      </>
    )
  }



}


const mapStateToProps = state => {
  return {
    city: state.city
  };
}


export default connect(mapStateToProps)(Travel);

// X Restaurants
// Events (ticketmaster)
// Hotels
// Cars
// Local News