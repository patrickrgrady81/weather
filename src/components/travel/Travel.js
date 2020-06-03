import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from "../nav/Nav"
import Search from "../search/Search"
import './Travel.css';


class Travel extends Component {

  render = () => {
    return (
      <>
        <Nav />
        <Search />
        <h1 className="travel-info">Information for {this.props.city}</h1>
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