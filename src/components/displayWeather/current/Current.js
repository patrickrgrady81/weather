import React, { Component } from 'react'
import "./Current.css"

export default class Current extends Component {
  render = () => {
    if (this.props.weather && this.props.weather.message) {
      console.log(this.props.weather.message);
    } else if (this.props.weather && !this.props.weather.message) {
      // console.log(this.props.weather);
    } else { 
      // console.log("Getting data...");
    }

    return (
    <div>
      {this.showCurrentWeather()}
    </div>
  )}


  showCurrentWeather = () => {
    if (this.props.weather && !this.props.weather.message) {
      return (
        <div key="currentWeatherDiv" className="current">
          <h1 key="ch11">{!this.props.weather ? "Getting Current Weather Conditions" : ""}</h1>
          <h2 className="current-h2" key="ch12">Weather for {this.props.getDate(new Date())} at {this.props.weather ?
            `${this.props.getTime(this.props.weather.observation_time.value)}` : ""}</h2>
          <ul key="currentul" className="currentWeatherList">
            <li key={"curli0"}><h3 key="ch21">{this.props.weather ?
              `${this.props.weather.weather_code.value.toUpperCase().replace("_", " ")}` : ""}</h3></li>
            <li key="curli1">{this.props.weather ? `Current Temperature: ${this.props.weather.temp.value}\u00B0
                    ${this.props.weather.temp.units}` : ""}</li>
            <li key="curli2">{this.props.weather ? `Feels Like: ${this.props.weather.feels_like.value}\u00B0
                    ${this.props.weather.feels_like.units}` : ""}</li>
            <li key="curli3">{this.props.weather ? `Precipitation: ${this.getRain()}` : ""}</li>
            <li key="curli4">{this.props.weather ? `Cloud Cover: ${this.props.weather.cloud_cover.value}
                    ${this.props.weather.cloud_cover.units}` : ""}</li>
            <li key="curli5">{this.props.weather ? `Wind Speed: ${this.props.weather.wind_speed.value}
                    ${this.props.weather.wind_speed.units} ${this.getWindDir()}` : ""}</li>
            <li key={"curli6"}>{this.props.weather ? `Humidity: ${this.props.weather.humidity.value} ${this.props.weather.humidity.units}` : ""}</li>
            <li key="curli7">{this.props.weather ? `Visibility: ${this.props.weather.visibility.value} ${this.props.weather.visibility.units}` : ""}</li>
            <li key="curli8">{this.props.weather ? `Sunrise: ${this.getSunrise()}` : ""}</li>
            <li key="curli9">{this.props.weather ? `Sunset: ${this.getSunset()}` : ""}</li>
          </ul>
        </div>
      )
    }
  }

  getRain = () => {
    const type = this.props.weather.precipitation_type.value;
    const amt = this.props.weather.precipitation.value;
    const units = this.props.weather.precipitation.units;
    if (type === "none") {
      return "None"
    } else {
      return `${type}: ${amt}${units}`
    }
  }

  getSunrise = () => {
    if (this.props.weather.sunrise) {
      return this.props.getTime(this.props.weather.sunrise.value)
    }
  }

  getSunset = () => {
    if (this.props.weather.sunset) {
      return this.props.getTime(this.props.weather.sunset.value)
    }
  }

  getWindDir = () => {
    const direction = this.props.weather.wind_direction;
    if (direction.value <= 45 || direction.value > 315) {
      return "N";
    } else if (direction.value > 45 && direction.value <= 135) {
      return "W";
    } else if (direction.value > 135 && direction.value < 225) {
      return "S";
    } else {
      return "E"
    }
  }
}