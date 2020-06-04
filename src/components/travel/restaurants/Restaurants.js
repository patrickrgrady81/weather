import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from "../../nav/Nav"
import './Restaurants.css';


class Restaurants extends Component {

  render = () => {
    if (this.props.restaurants) {
      return (
        <>
        <Nav />
        <div className="rest-wrapper">
          <h1>Top 10 Restaurants on Yelp</h1>
          <ul className="rest-div1">
              {this.props.restaurants.map((rest, i) => {
                return (
                  <div key={`div${i}`}>
                    <li key={`name${i}`} className="rest-name">{rest.name}</li>
                    <img key={`img${i}`} src={`${rest.image_url}`} alt={`${rest.name}`}></img>
                    <ul>
                      <li key={`cat${i}`} className="rest-cat">{rest.categories[0].title}</li>  
                      <li key={`phone${i}`}>{rest.display_phone}</li>  
                      <li key={`address${i}`}>{`${rest.location.address1}`}</li>  
                      <li key={`city${i}`}>{`${rest.location.city}, ${rest.location.state} ${rest.location.zip_code}`}</li>  
                    </ul>
                  </div>
                )
              })}
          </ul>
          </div>
        </>
      )
    } else { 
      return (
        <>
          <Nav />
          <h2>Loading Restaurants For {this.props.city}...</h2>
        </>
      )
    }
  }

  componentDidMount = () => { 
    this.getRestaurants();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.getRestaurants();
    }
  }

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
    city: state.city,
    restaurants: state.restaurants
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateRestaurants: (restaurants) => dispatch({ type: 'UPDATE_RESTAURANTS', restaurants }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);