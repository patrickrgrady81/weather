import React, { Component } from 'react'
import { connect } from 'react-redux';
import "./Hourly.css"

class Hourly extends Component { 
  render = () => { 
    if (this.props.hourly && this.props.hourly.message) {
      console.log(this.props.hourly.message);
    } else if (this.props.hourly && !this.props.hourly.message) {
      // console.log(this.props.hourly);
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
    if (this.props.hourly && !this.props.hourly.message) {
      return (
        <div className="hourly" key="hourlydiv">
          <h2 className="hourly-h2" key="hourlyh2">12 Hour Forecast</h2>
          <ul className="hourlyList" key="hourlyul">
            {this.props.hourly.slice(1,13).map((hour, i) => {
              return (
                <div key={`lihourdiv${i}`}>
                  <h3 key={`h2${i}`}>{`${this.getTime(hour.observation_time.value)} `}</h3>
                  <li key={`cond${i}`}>{`Conditions: ${hour.weather_code.value.toLowerCase().replace("_", " ")}`}</li>
                  <li key={`temp${i}`}>{`Temperature: ${hour.temp.value}\u00B0${hour.temp.units}`}</li>
                  <li key={`prec${i}`}>{`Precipitation: ${hour.precipitation_type.value.toLowerCase().replace("_", " ")} 
                        (${hour.precipitation.value} ${hour.precipitation.units})`}</li>
                </div>
              )
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <h2 key="get">Getting Hourly Forcast Data...</h2>
      )
    }
  }

  getTime = (time) => { 
    time = new Date(time);
    let hrs = time.getHours();
    const postfix = hrs >= 12 ? "PM" : "AM"; 
    hrs = hrs > 12 ? hrs - 12 : hrs;
    hrs = hrs === 0 ? 12 : hrs

    const mins = time.getMinutes();
    const showMins = (mins < 10) ? `0${mins}` : `${mins}`;

    return `${hrs}:${showMins} ${postfix}`;
  }
}

const mapStateToProps = state => {
  return {
    hourly: state.hourly
  };
}

export default connect(mapStateToProps)(Hourly);