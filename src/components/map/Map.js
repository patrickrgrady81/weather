import React from 'react'
import { connect } from 'react-redux'
import "./Map.css"

const Map = (props) => { 
  if (props.map) {
    return (
      <div className="map-div">
        <img width="600" height="300" src={props.map } alt="your town" className="map"></img>
      </div>
    );
  } else { 
    return (
      <h2>Can't display map</h2>
    )
  }
}

const mapStateToProps = ({ map }) => { 
  return {
    map
  }
}

export default connect(mapStateToProps)(Map);