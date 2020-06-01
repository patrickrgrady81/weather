import React, { Component } from 'react'
import { connect } from 'react-redux';
import "./Daily.css"

class Daily extends Component {
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
        {this.showDailyForecast()}
      </div>
    )
  }

  showDailyForecast = () => {
    if (this.props.daily && !this.props.daily.message) {
      return (
        <div className="daily" key="dailyDiv">
          <h2 className="daily-h2">10 Day Forecast</h2>
          <ul className="dailyList" key="dailyul">
            {this.props.daily.slice(2,12).map((day, i) => {
              return (
                <div key={`dailyDiv${i}`}>
                <h3 key={`date${i}`}>{this.getDay(new Date(day.observation_time.value))}</h3>
                <li key={`cond${i}`}>{`Conditions: ${day.weather_code.value.toLowerCase().replace("_", " ")}`}</li>
                <li key={`temp${i}`}>{`Temperature: ${day.temp[0].min.value}${day.temp[0].min.units} / 
                                      ${day.temp[1].max.value}${day.temp[1].max.units}`}</li>
                
                </div>
            )
          })}
            </ul>
        </div>
      )
    }
  }

  getDay = (date) => { 
    switch (date.getDay()) { 
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default: 
        return "Unknown Day"
    }
  }
}

const mapStateToProps = state => {
  return {
    daily: state.daily
  };
}

export default connect(mapStateToProps)(Daily);