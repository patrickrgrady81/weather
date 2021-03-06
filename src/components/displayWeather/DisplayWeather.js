import React from 'react';
import { connect } from 'react-redux';
import Current from "./current/Current";
import Hourly from "./hourly/Hourly";
import Daily from "./daily/Daily";
import './DisplayWeather.css';


const DisplayWeather = (props) => {
    if (props.weather) {
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

const mapStateToProps = state => {
  return {
    weather: state.weather
  };
}

export default connect(mapStateToProps)(DisplayWeather);
