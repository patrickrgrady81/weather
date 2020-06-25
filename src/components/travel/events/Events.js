import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEvents } from "../../../actions/events"
import { getLatLng } from "../../../actions/getLatLng"
import Nav from "../../nav/Nav"
import './Events.css';


class Events extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      search: "",
      searched: false,
      searchEvents: []
    }
  }

  render = () => {
    if (this.props.events) {
      if (this.props.events.length > 0) {
        return (
          <>
            <Nav />
            <div className="event-wrapper">
              <h1>Upcoming Events in {this.props.city}</h1>
              <form onSubmit={this.handleForm}>
                <input onChange={this.handleChange} type="text" name="search" value={this.state.value} placeholder="Search for event">

                </input>
                <button>Go</button>
              </form>
              <ul>
                { this.props.loading === "success" ? !this.state.searched ? this.props.events.map((e, i) => {
                  return (
                    <div key={`div${i}`} className="events-wrapper">
                      <li key={`name${i}`} className="event-name">{e._embedded.events[0].name}</li>
                      <li key={`venue${i}`} className="event-name">{e._embedded.events[0]._embedded.venues[0].name}</li>
                      <li key={`class${i}`} className="event-name">{e._embedded.events[0].classifications[0].genre.name}</li>
                      <li key={`date${i}`} className="event-name">{e._embedded.events[0].dates.start.localDate} @ {e._embedded.events[0].dates.start.localTime}</li>
                    </div>
                  )
                }): this.state.searchedEvents.map((e, i) => {
                  return (
                    <div key={`div${i}`} className="events-wrapper">
                      <li key={`name${i}`} className="event-name">{e._embedded.events[0].name}</li>
                      <li key={`venue${i}`} className="event-name">{e._embedded.events[0]._embedded.venues[0].name}</li>
                      <li key={`class${i}`} className="event-name">{e._embedded.events[0].classifications[0].genre.name}</li>
                      <li key={`date${i}`} className="event-name">{e._embedded.events[0].dates.start.localDate} @ {e._embedded.events[0].dates.start.localTime}</li>
                    </div>
                  )
                }) : "Loading..."}
              </ul>
            </div>
          </>
        )
      } else {
        return (
          <>
            <Nav />
            <h2 className="event-wrapper">Sorry, Can't Find Any Events Nearby</h2>
          </>
        )
      }
    } else {
      return (
        <>
          <Nav />
          <h2>Loading Events in {this.props.city}...</h2>
        </>
      )
    }
  }

  handleChange = (e) => { 
    e.preventDefault();
    this.setState({ search: e.target.value });
  }

  handleForm = async (e) => {
    e.preventDefault();
    if (this.state.search === "") return
    let localSearchedEvents = [];

    this.props.events.forEach(e => {
      if (e._embedded.events[0].classifications[0].genre.name.includes(this.state.search)) {
        localSearchedEvents.push(e);
      }
    })
    // console.log(searchedEvents);
    this.setState({ searched: true, searchedEvents: localSearchedEvents });
  }

  componentDidMount = () => {
    this.props.updateEvents(this.props.city);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.props.getLatLng(this.props.city);
      this.props.updateEvents(this.props.city);
    }
  }
}

const mapStateToProps = ({city, events, loading}) => {
  return {
    city,
    events,
    loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getLatLng: (city) => dispatch(getLatLng(city)),
    updateEvents: (city) => dispatch(updateEvents(city)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);