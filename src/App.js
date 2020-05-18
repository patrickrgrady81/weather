import React, { Component } from 'react'
import './App.css';
import Search from "./components/search/Search"
import DisplayWeather from './components/displayWeather/DisplayWeather';

export default class App extends Component {
  constructor() { 
    super();

    this.state = {
      weather: {}
    }
  }

  componentDidMount = async () => { 
    const latlng = await this.getLatLng();
    this.getWeather(latlng);
  }

  getWeather = async (latlng) => { 
    const key = process.env.REACT_APP_WEATHER;
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat}&lon=${latlng.lng}&appid=${key}&units=imperial`;

    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    // console.log(data.weather[0].description);
    this.setState({weather: data});

  }

  getLatLng = async () => { 
    const address = "Pottstown+PA"
    const key = process.env.REACT_APP_MAPQUEST;
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=kvp&outFormat=json&location=${address}`;
    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    const latlng = data.results[0].locations[0].displayLatLng
    // console.log(latlng);
    return latlng;
  }
  
  render = () => {
    return (
      <div className="App">
        <Search />
        <DisplayWeather weather={this.state.weather}/>
      </div>
    );
  }
}
