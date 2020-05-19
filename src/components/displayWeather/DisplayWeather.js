import React, { Component } from 'react';
import Current from "./current/Current";
import Hourly from "./hourly/Hourly";
import Daily from "./daily/Daily";


export default class DisplayWeather extends Component { 

  render = () => {
    // if (this.props.hourly) {
    //   console.log(this.props.hourly[0]);
    // }
    if (this.props.weather) {
      if (this.props.weather.MYerror) {
        return (
          <h1>{this.props.weather.MYerror}</h1>
        )
      } else {
        return (
          <div key="outerdiv" className="outerDiv">
            <Daily daily={this.props.daily} getDate={this.getDate} getTime={this.getTime} />
            <Current weather={this.props.weather} getDate={this.getDate} getTime={this.getTime} />
            <Hourly hourly={this.props.hourly} getDate={this.getDate} getTime={this.getTime} />
          </div>
        )
      }
    } else { 
      return (
        "Connection Error!"
      )
    }
  }
  
  getDate = (date) => { 
    return date.toLocaleDateString("en-US")
  }

  getTime = (tim) => { 
    if (this.props.weather.temp) {
      const timeNow = new Date(tim);
      let hrs = timeNow.getHours();
      const postfix = hrs >= 12 ? "PM" : "AM"; 
      hrs = hrs > 12 ? hrs - 12 : hrs;
      hrs = hrs === 0 ? 12 : hrs

      const mins = timeNow.getMinutes();
      const showMins = (mins < 10) ? `0${mins}` : `${mins}`;

      const secs = timeNow.getSeconds();
      const showSecs = (secs < 10) ? `0${secs}` : `${secs}`;

      return `${hrs}:${showMins}:${showSecs} ${postfix}`;
    }
  }
}