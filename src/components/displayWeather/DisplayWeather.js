import React, { Component } from 'react';
import Current from "./current/Current";
import Hourly from "./hourly/Hourly";
import Daily from "./daily/Daily";
import { connect } from 'react-redux';


class DisplayWeather extends Component {

  render = () => {
    if (this.props.weather) {
      return (
        <div key="outerdiv" className="outerDiv">
          <Hourly />
          <Current/>
          <Daily />
        </div>
      )
    } else {
      return (
        "Connection Error!"
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather
  };
}

export default connect(mapStateToProps)(DisplayWeather);
