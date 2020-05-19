import React, { Component } from 'react'
import './App.css';
import './components/displayWeather/DisplayWeather.css';
import Search from "./components/search/Search"
import DisplayWeather from './components/displayWeather/DisplayWeather';
import Map from './components/map/Map';

export default class App extends Component {
  constructor() { 
    super();

    this.state = {
      city: "Pottstown, PA",
      weather: null,
      hourly: null,
      daily: null, 
      map: null
    }
  }

  render = () => {
    return (
      <div className="App">
        <Search setCity={this.setCity}/>
        <h1 className="city">{this.state.city}</h1>
        <Map map={this.state.map}/>
        <DisplayWeather weather={this.state.weather} hourly={this.state.hourly} daily={this.state.daily}/>
      </div>
    );
  }

  componentDidMount = async () => { 
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
      this.setState({ weather: data });
    } else { 
      this.setState({ weather: {MYerror: "Could not get weather data... Most likely too many requests, climacell is down for some reason, or a problem with your internet"}});
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
      this.setState({ hourly: data });
    } else { 
      this.setState({ weather: {MYerror: "Could not get weather data... Most likely too many requests, climacell is down for some reason, or a problem with your internet"}});
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
      this.setState({ daily: data });
    } else { 
      this.setState({ weather: {MYerror: "Could not get weather data... Most likely too many requests, climacell is down for some reason, or a problem with your internet"}});
    }
  }

  getLatLng = async () => { 
    const address = this.state.city;
    const key = process.env.REACT_APP_MAPQUEST;
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=kvp&outFormat=json&location=${address}`;
    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    const latlng = data.results[0].locations[0].displayLatLng
    const map = data.results[0].locations[0].mapUrl;
    this.setState({map});
    // console.log(latlng);
    return latlng;
  }

  setCity = (city) => { 
    this.setState({city});
  }
}
