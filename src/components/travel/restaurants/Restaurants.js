import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRestaurants } from "../../../actions/restaurants"
import { getLatLng } from "../../../actions/getLatLng"
import Nav from "../../nav/Nav"
import './Restaurants.css';


class Restaurants extends Component {

  render = () => {
    if (this.props.restaurants) {
      return (
        <>
        <Nav />
        <div className="rest-wrapper">
            <h1 className="rest-head">Highly Rated Restaurants in {this.props.city}</h1>
          <ul className="rest-list">
              {this.props.loading === "success" ? this.props.restaurants.map((rest, i) => {
                return (
                  <div className="rest-container" key={`div${i}`}>
                    <li key={`name${i}`} className="rest-name">{rest.name}</li>
                    <img className="rest-img" key={`img${i}`} src={`${rest.image_url}`} alt={`${rest.name}`}></img>
                    <ul className="rest-info">
                      <li key={`cat${i}`} className="rest-cat">{rest.categories[0].title}</li>  
                      <li key={`phone${i}`}>{rest.display_phone}</li>  
                      <li key={`address${i}`}>{`${rest.location.address1}`}</li>  
                      <li key={`city${i}`}>{`${rest.location.city}, ${rest.location.state} ${rest.location.zip_code}`}</li>  
                    </ul>
                  </div>
                )
              }) : "Loading..."}
          </ul>
          </div>
        </>
      )
    } else { 
      return (
        <>
          <Nav />
          <h2>Loading Restaurants in {this.props.city}...</h2>
        </>
      )
    }
  }

  componentDidMount = async () => { 
    await this.props.updateRestaurants(this.props.city);
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.city !== this.props.city) {
      await this.props.getLatLng(this.props.city);
      await this.props.updateRestaurants(this.props.city);
    }
  }
}

const mapStateToProps = ({city, restaurants, loading}) => {
  return {
    city,
    restaurants,
    loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getLatLng: (city) => dispatch(getLatLng(city)),
    updateRestaurants: (city) => dispatch(updateRestaurants(city)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);