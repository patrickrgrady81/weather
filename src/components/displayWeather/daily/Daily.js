import React, { Component } from 'react'

export default class Current extends Component {
  render = () => {
    if (this.props.daily && this.props.daily.message) {
      console.log(this.props.hourly.message);
    } else if (this.props.daily && !this.props.daily.message) {
      // console.log(this.props.daily[0]);
    } else { 
      // console.log("Getting data...");
    }

    return (
      <div>
        {this.showHourlyForecast()}
      </div>
    )
  }

  showHourlyForecast = () => {
    if (this.props.daily && !this.props.daily.message) {
      return (
        <div key="dailyDiv">
          <h2 className="weather">15 Day Forecast</h2>
          <ul key="dailyul" className="dailyList">
            {this.props.daily.map((day, i) => {
              return (
                <div key={`dailyDiv${i}`}>
                <h3 key={`date${i}`}>{this.props.getDate(new Date(day.observation_time.value))}</h3>
                <li key={`temp${i}`}>{`Temperature: ${day.temp[0].min.value}${day.temp[0].min.units} / 
                                      ${day.temp[1].max.value}${day.temp[1].max.units}`}</li>
                <li key={`cond${i}`}>{`Conditions: ${day.weather_code.value.toLowerCase().replace("_", " ")}`}</li>
                
                </div>
            )
          })}
            </ul>
        </div>
      )
      }
  }
}