
import React, { Component } from 'react'


export default class DisplayWeather extends Component { 

  render = () => {
    // if (this.props.weather.temp) {
    //   console.log(this.props.weather);
    // }

    return (
      <div className="weather">
        <h1>Weather for {this.getDate()} at {this.props.weather.temp ?
                `${this.getTime(this.props.weather.observation_time.value)}` : ""}</h1>
        <h2>{this.props.weather.weather_code ? `${this.props.weather.weather_code.value.toUpperCase()}` : ""}</h2>
        <p>{this.props.weather.temp ? `Current Temperature: ${this.props.weather.temp.value}\u00B0
                ${this.props.weather.temp.units}` : ""}</p>
        <p>{this.props.weather.feels_like ? `Feels Like: ${this.props.weather.feels_like.value}\u00B0
                ${this.props.weather.feels_like.units}` : ""}</p>
        <p>{this.props.weather.precipitation ? `Precipitation: ${this.getRain()}` : ""}</p>
                <p>{this.props.weather.temp ? `Cloud Cover: ${this.props.weather.cloud_cover.value}
                        ${this.props.weather.cloud_cover.units}` : ""}</p>
        <p>{this.props.weather.wind_speed ? `Wind Speed: ${this.props.weather.wind_speed.value}
                ${this.props.weather.wind_speed.units} ${this.getWindDir()}` : ""}</p>
        <p>{this.props.weather.humidity ? `Humidity: ${this.props.weather.humidity.value} ${this.props.weather.humidity.units}` : ""}</p>
        <p>{this.props.weather.visibility ? `Visibility: ${this.props.weather.visibility.value} ${this.props.weather.visibility.units}` : ""}</p>
        <p>{this.props.weather.sunrise ? `Sunrise: ${this.getSunrise()}` : ""}</p>
        <p>{this.props.weather.sunset ? `Sunset: ${this.getSunset()}` : ""}</p>
      </div>
    )
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
      return this.getTime(this.props.weather.sunrise.value)
    }
  }
  
  getSunset = () => { 
    if (this.props.weather.sunset) { 
      return this.getTime(this.props.weather.sunset.value)
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
  
  getDate = () => { 
    const s = new Date().toLocaleDateString("en-US")
    return s
  }

  getTime = (tim) => { 
    if (this.props.weather.temp) {
      const timeNow = new Date(tim);
      let hrs = timeNow.getHours();
      let postfix;
      if (hrs > 12) {
        hrs = hrs - 12;
        postfix = "PM";
      } else { 
        postfix = "AM";
      }

      const mins = timeNow.getMinutes();
      const showMins = (mins < 10) ? `0${mins}` : `${mins}`;

      const secs = timeNow.getSeconds();
      const showSecs = (secs < 10) ? `0${secs}` : `${secs}`;

      return `${hrs}:${showMins}:${showSecs} ${postfix}`;
    }
  }
}