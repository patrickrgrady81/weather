import React from 'react'
import { connect } from 'react-redux';
import "./Current.css"

const Current = (props) => {
  if (props.weather && !props.weather.message) {
    return (
      <div key="currentWeatherDiv" className="current">
        <h1 key="ch11">{!props.weather ? "Getting Current Weather Conditions" : ""}</h1>
        <ul key="currentul" className="currentWeatherList">
          <li key={"curli0"}><h3 key="ch21">{props.weather ?
            `${props.weather.weather_code.value.toUpperCase().replace("_", " ")}` : ""}</h3></li>
          <li key="curli1">{props.weather ? `Current Temperature: ${props.weather.temp.value}\u00B0
                  ${props.weather.temp.units}` : ""}</li>
          <li key="curli2">{props.weather ? `Feels Like: ${props.weather.feels_like.value}\u00B0
                  ${props.weather.feels_like.units}` : ""}</li>
          <li key="curli3">{props.weather ? `Precipitation: ${getRain(props)}` : ""}</li>
          <li key="curli4">{props.weather ? `Cloud Cover: ${props.weather.cloud_cover.value}
                  ${props.weather.cloud_cover.units}` : ""}</li>
          <li key="curli5">{props.weather ? `Wind Speed: ${props.weather.wind_speed.value}
                  ${props.weather.wind_speed.units} ${getWindDir(props)}` : ""}</li>
          <li key={"curli6"}>{props.weather ? `Humidity: ${props.weather.humidity.value} ${props.weather.humidity.units}` : ""}</li>
          <li key="curli7">{props.weather ? `Visibility: ${props.weather.visibility.value} ${props.weather.visibility.units}` : ""}</li>
          <li key="curli8">{props.weather ? `Sunrise: ${getSunrise(props)}` : ""}</li>
          <li key="curli9">{props.weather ? `Sunset: ${getSunset(props)}` : ""}</li>
        </ul>
        <h2 className="current-h2" key="ch12">(last updated: {getDate(new Date())} at {props.weather ?
          `${getTime(props, props.weather.observation_time.value)})` : ""}</h2>
      </div>
    )
  } else { 
    return (
      <>
        Loading Current Weather...
      </>
    )
  }
}

const getDate = (date) => {
  return date.toLocaleDateString("en-US")
}

const getTime = (props, tim) => {
  if (props.weather.temp) {
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

const getRain = (props) => {
  const type = props.weather.precipitation_type.value;
  const amt = props.weather.precipitation.value;
  const units = props.weather.precipitation.units;
  if (type === "none") {
    return "None"
  } else {
    return `${type}: ${amt}${units}`
  }
}

const getSunrise = (props) => {
  if (props.weather.sunrise) {
    return getTime(props, props.weather.sunrise.value)
  }
}

const getSunset = (props) => {
  if (props.weather.sunset) {
    return getTime(props, props.weather.sunset.value)
  }
}

const getWindDir = (props) => {
  const direction = props.weather.wind_direction;
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

const mapStateToProps = state => {
  return {
    weather: state.weather
  };
}

export default connect(mapStateToProps)(Current);
