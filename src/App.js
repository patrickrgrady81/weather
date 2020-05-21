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
        <Search setCity={this.setCity} />
        <h1 className="city">{this.state.city}</h1>
        <Map map={this.state.map}/>
        <DisplayWeather city={this.state.city} weather={this.state.weather} hourly={this.state.hourly} daily={this.state.daily}/>
      </div>
    );
  }

  run = async () => { 
    const latlng = await this.getLatLng();
    await this.getWeather(latlng);
    await this.getHourlyForecast(latlng);
    await this.getDailyForecast(latlng);
  }

  componentDidMount = () => { 
    this.run();
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
    this.setState({city: `${data.results[0].locations[0].adminArea5}, ${data.results[0].locations[0].adminArea3}` });
    const latlng = data.results[0].locations[0].displayLatLng
    await this.getMap(latlng);

    return latlng;
  }

  getMap = async (latlng) => { 
    const map = `https://www.mapquestapi.com/staticmap/v4/getplacemap?key=EtyXXVE9Ky0eBwniVcww2Zlu8DmFmc7F&location=${latlng.lat},${latlng.lng}&size=600,300&type=map&zoom=11&imagetype=png&scalebar=false&traffic=flow`;

    this.setState({map});
  }

  setCity = async (newCity) => { 
    await this.setState({ city: newCity });
    this.run();
  }
}
