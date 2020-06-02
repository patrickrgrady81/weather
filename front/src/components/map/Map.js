import React, { Component } from 'react'
import "./Map.css"

export default class Map extends Component { 
  render = () => {
    if (this.props.map) {
      // console.log(this.props.map);
      return (
        <div className="mapDiv">
          <img width="600" height="300" src={this.props.map } alt="your town" className="map"></img>
        </div>
      );
    } else { 
      return (
        <h2>Can't display map</h2>
      )
    }
  }
}