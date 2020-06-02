import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from "../search/Search"
import Nav from "../nav/Nav"
import './Travel.css';


class Travel extends Component {

  render = () => {
    return (
      <>
        <Nav />
        <Search />
        <h1>Information for {this.props.city}</h1>
      </>
    )
  }


  componentDidMount = () => {
    this.run()
  }

  run = async () => {
    this.getRestaurants();
  }

  getRestaurants = async () => {
    // const top10 = [];
    const city = this.props.city;
    const key = process.env.REACT_APP_YELP_API;

    const fetchInfo = {
      "method": "GET",
      "headers": {
        Authorization: `Bearer ${key}`,
        params: {
          location: {city},
          categories: 'restaurant',
          locale: 'en_US',
          sort_by: 'rating',
          limit: 10
        }
      }
    }

    console.log("Getting restaurants");
    const url = `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${city}`;
    const response = await fetch(url, fetchInfo);
    const data = await response.json();

    console.log(data);
    this.getRestaurantData(data);
  }

  getRestaurantData = async (restaurants) => {
    const key = process.env.REACT_APP_YELP_API;
    const fetchInfo = {
      "method": "GET",
      "headers": {
        Authorization: `Bearer ${key}`,
        params: {
          locale: 'en_US',
        }
      }
    }
    // for (let i = 0; i < 10; i++) { 
    console.log("Getting restaurant info");
      const url = `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/${restaurants.businesses[0].id}`;
      const response = await fetch(url, fetchInfo);
      const data = await response.json();
      console.log(data);
    //   top10.push(data);
    // }

   }
}
// getLatLng = async () => { 
//   const address = this.props.city;
//   const key = process.env.REACT_APP_MAPQUEST;
//   const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=kvp&outFormat=json&location=${address}`;
//   const fetchInfo = {
//     "method": "GET",
//     "headers": {}
//   }
//   const response = await fetch(url, fetchInfo);
//   const data = await response.json();
//   console.log(data);
//   const latlng = data.results[0].locations[0].displayLatLng
//   await this.getMap(latlng);
//   this.props.updateCity(`${data.results[0].locations[0].adminArea5}, ${data.results[0].locations[0].adminArea3}`);

//   return latlng;
// }

const mapStateToProps = state => {
  return {
    city: state.city
  };
}

export default connect(mapStateToProps)(Travel);

// Restaurants
// Hotels
// Cars
// Events (ticketmaster)
// Local News