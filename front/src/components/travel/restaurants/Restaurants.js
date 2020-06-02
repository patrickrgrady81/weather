import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Restaurants.css';


class Restaurants extends Component {

  render = () => {
    if (this.props.restaurants) {
      return (
        <div className="rest-wrapper">
          <h1>Top 10 Restaurants on Yelp</h1>
          <ul>
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
      )
    } else { 
      return (
        <h2>Loading Restaurants...</h2>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants
  };
}

export default connect(mapStateToProps)(Restaurants);