import React, { Component } from 'react'
import Nav from '../nav/Nav';
import "./Profile.css"

class Profile extends Component {
  render = () => {
    return (
      <div className="settings">
        <Nav />
        <h1>Welcome</h1> {/* username */}
        
        {/* what default City? */}
        {/* Show Current? */}
        {/* Show 12 Hour? */}
        {/* Show 10 Day? */}
      </div>
    )
  }
}

export default Profile;