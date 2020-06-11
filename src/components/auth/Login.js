import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/nav/Nav';

 
class Login extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: ""
    }
      
  }

  render() {
    return (
      <>
        <Nav />
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />
          <button type="submit">Log In</button>
        </form>
      </>
    )
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/api/v1/login`
    const fetchInfo = {
      "method": "POST",
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    }
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    console.log(data);
    if (data.logged_in === true) { 
      await this.props.login(data.user.email, data.user.id);
    }
  }

  handleChange = (e) => { 
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
}

const mapStateToProps = state => {
  return {
    city: state.city,
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    login: (email) => dispatch({ type: 'LOGIN',  email })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);