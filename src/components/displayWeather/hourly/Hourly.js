import React from 'react'
import { connect } from 'react-redux';
import "./Hourly.css"

const Hourly = (props) => {
  if (props.hourly) {
    return (
      <div className="hourly" key="hourlydiv">
        <h2 className="hourly-h2" key="hourlyh2">12 Hour Forecast</h2>
        <ul className="hourlyList" key="hourlyul">
          {props.hourly.slice(1, 13).map((hour, i) => {
            return (
              <div key={`lihourdiv${i}`}>
                <h3 key={`h2${i}`}>{`${getTime(hour.observation_time.value)} `}</h3>
                <li key={`cond${i}`}>{`Conditions: ${hour.weather_code.value.toLowerCase().replace("_", " ")}`}</li>
                <li key={`temp${i}`}>{`Temperature: ${hour.temp.value}\u00B0${hour.temp.units}`}</li>
                <li key={`prec${i}`}>{`Precipitation: ${hour.precipitation_type.value.toLowerCase().replace("_", " ")} 
                        (${hour.precipitation.value} ${hour.precipitation.units})`}</li>
              </div>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return (
      <>
        Loading Hourly Forecast...
      </>
    )
  }
}

  const getTime = (time) => { 
    time = new Date(time);
    let hrs = time.getHours();
    const postfix = hrs >= 12 ? "PM" : "AM"; 
    hrs = hrs > 12 ? hrs - 12 : hrs;
    hrs = hrs === 0 ? 12 : hrs

    const mins = time.getMinutes();
    const showMins = (mins < 10) ? `0${mins}` : `${mins}`;

    return `${hrs}:${showMins} ${postfix}`;
  }

const mapStateToProps = state => {
  return {
    hourly: state.hourly
  };
}

export default connect(mapStateToProps)(Hourly);