
import React, { Component } from 'react'


export default class DisplayWeather extends Component { 

  render = () => { 
    if (this.props.weather.weather) {
      console.log(this.props.weather.weather[0].description);
    }

    return (
      <div>
        <h1>Weather for {this.props.weather.name}</h1>
        <p>{this.props.weather.main ? `Current Weather: ${this.props.weather.main.temp}\u00B0` : ""}</p>
        <p>{this.props.weather.main ? `Feels Like: ${this.props.weather.main.feels_like}\u00B0` : ""}</p>
        <p>{this.props.weather.weather ? `Current Conditions: ${this.props.weather.weather[0].description}` : ""}</p>
      </div>
    )
  }
}