import React, { Component } from 'react'
import './App.css';
import './components/displayWeather/DisplayWeather.css';
import Search from "./components/search/Search"
import DisplayWeather from './components/displayWeather/DisplayWeather';
import Map from './components/map/Map';
import Nav from './components/nav/Nav';
import { connect } from 'react-redux';

class App extends Component {

  render = () => {
    return (
      <>
        <Nav />
        <Search run={this.run} />
        <h1 className="city">{this.props.city}</h1>
        <Map map={this.props.map}/>
        <DisplayWeather/>
      </>
    );
  }

  componentDidMount = () => { 
    this.run()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.run();
    }
  }

  run = async () => { 
    const latlng = await this.getLatLng();
    await this.getWeather(latlng);
    await this.getHourlyForecast(latlng);
    await this.getDailyForecast(latlng);
  }

  getWeather = async (latlng) => {
    const key = process.env.REACT_APP_CLIMACELL
    const us = "us";
    const more = `precipitation,precipitation_type,sunrise,sunset,visibility,cloud_cover,weather_code`
    const fields = `temp,feels_like,wind_speed,dewpoint,humidity,wind_direction,baro_pressure,${more}`
    const query = `lat=${latlng.lat}&lon=${latlng.lng}&unit_system=${us}&apikey=${key}&fields=${fields}`
    const url = `https://api.climacell.co/v3/weather/realtime?${query}`
    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    if (!data.message) {
      this.props.updateWeather(data);
    }
  }

  getHourlyForecast = async (latlng) => {
    const key = process.env.REACT_APP_CLIMACELL
    const us = "us"
    const fields = "precipitation_type,precipitation,temp,weather_code"
    const query = `lat=${latlng.lat}&lon=${latlng.lng}&unit_system=${us}&apikey=${key}&fields=${fields}&start_time=now`
    const url = `https://api.climacell.co/v3/weather/forecast/hourly?${query}`
    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    if (!data.message) {
      this.props.updateHourly(data);
    } 
  }

  getDailyForecast = async (latlng) => {
    const key = process.env.REACT_APP_CLIMACELL
    const us = "us"
    const fields = `temp,precipitation,weather_code`
    const query = `lat=${latlng.lat}&lon=${latlng.lng}&unit_system=${us}&start_time=now&apikey=${key}&fields=${fields}`
    const url = `https://api.climacell.co/v3/weather/forecast/daily?${query}`

    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    if (!data.message) {
      this.props.updateDaily(data);
    } 
  }

  getLatLng = async () => { 
    const address = this.props.city;
    const key = process.env.REACT_APP_MAPQUEST;
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=kvp&outFormat=json&location=${address}`;
    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    // this.setState({ city: `${data.results[0].locations[0].adminArea5}, ${data.results[0].locations[0].adminArea3}` });
    // debugger
    const latlng = data.results[0].locations[0].displayLatLng
    await this.getMap(latlng);
    this.props.updateCity(`${data.results[0].locations[0].adminArea5}, ${data.results[0].locations[0].adminArea3}`);

    return latlng;
  }

  getMap = async (latlng) => { 
    const key = process.env.REACT_APP_MAPQUEST;
    const map = `https://www.mapquestapi.com/staticmap/v4/getplacemap?key=${key}&location=${latlng.lat},${latlng.lng}&size=600,300&type=map&zoom=11&imagetype=png&scalebar=false&traffic=flow`;

    this.props.updateMap(map);
  }
}

const mapStateToProps = state => {
  return {
    city: state.city,
    weather: state.weather,
    hourly: state.hourly,
    daily: state.daily, 
    map: state.map
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    updateCity: (city) => dispatch({ type: 'UPDATE_CITY', city }),
    updateMap: (map) => dispatch({ type: 'UPDATE_MAP', map }),
    updateDaily: (daily) => dispatch({type: 'UPDATE_DAILY', daily}),
    updateHourly: (hourly) => dispatch({type: 'UPDATE_HOURLY', hourly}),
    updateWeather: (weather) => dispatch({type: 'UPDATE_WEATHER', weather})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);