import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from "../nav/Nav"
import Search from "../search/Search"
import Restaurants from "./restaurants/Restaurants"
import './Travel.css';


class Travel extends Component {

  render = () => {
    return (
      <>
        <Nav />
        <Search />
        <h1 className="travel-info">Information for {this.props.city}</h1>
        <Restaurants />
      </>
    )
  }


  componentDidMount = () => {
    this.run()
  }

  run = async () => {
    this.getRestaurants();
  }

  // handleSearch = (cuisine, location) => {   
  //   const data = {cuisine: cuisine, location: location };   
  //   return fetch("http://localhost:3000/api/v1/search", {
  //       method: "POST",
  //       headers: {       
  //          'Accept': 'application/json',       
  //          'Content-Type': 'application/json',      
  //      },      
  //      body: JSON.stringify(data),    
  //  }) 

  getRestaurants = async () => {
    const fetchInfo = {
      "method": "POST",
      "headers": {
        'Accept': 'application/json',       
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ city: this.props.city })
    }
    const url = "http://localhost:3001/api/v1/restaurants"
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    // console.log(data);
    this.props.updateRestaurants(data);
  }
}

const mapStateToProps = state => {
  return {
    city: state.city
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateRestaurants: (restaurants) => dispatch({ type: 'UPDATE_RESTAURANTS', restaurants }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Travel);

// X Restaurants
// Hotels
// Cars
// Events (ticketmaster)
// Local News