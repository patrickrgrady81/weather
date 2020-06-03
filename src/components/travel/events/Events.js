import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from "../../nav/Nav"
import './Events.css';


class Events extends Component {

  render = () => {
    if (this.props.events) {
      if (this.props.events.length > 0) {
        return (
          <div className="event-wrapper">
            <Nav />
            <h1>Upcoming Events</h1>
            <ul>
              {this.props.events.map((e, i) => {
                return (
                  <div key={`div${i}`} className="events-wrapper">
                    <li key={`name${i}`} className="event-name">{e._embedded.events[0].name}</li>
                    <li key={`venue${i}`} className="event-name">{e._embedded.events[0]._embedded.venues[0].name}</li>
                    <li key={`class${i}`} className="event-name">{e._embedded.events[0].classifications[0].genre.name}</li>
                    <li key={`date${i}`} className="event-name">{e._embedded.events[0].dates.start.localDate} at
                                                              {e._embedded.events[0].dates.start.localTime}</li>
                  </div>
                )
              })}
            </ul>
          </div>
        )
      } else { 
        return (
          <>
            <Nav />
            <h2 className="event-wrapper">Sorry, No Events Nearby</h2>
          </>
        )
      }
  } else { 
      return (
        <>
          <Nav />  
          <h2>Loading Events For {this.props.city}...</h2>
        </>
      )
    }
  }

  componentDidMount = () => { 
    this.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.getEvents();
    }
  }
  
  getEvents = async () => { 
    const fetchInfo = {
      "method": "POST",
      "headers": {
        'Accept': 'application/json',       
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ city: this.props.city })
    }
    const url = `http://localhost:3001/api/v1/events`
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    console.log(data);
    this.props.updateEvents(data);
  }
}

const mapStateToProps = state => {
  return {
    city: state.city,
    events: state.events
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateEvents: (events) => dispatch({ type: 'UPDATE_EVENTS', events }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);