import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const axios = require('axios');

const Login = (props) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const token = localStorage.getItem('token');
  if (token) {
    props.history.push('/home');
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const token = await axios.post('http://localhost:4000/login', {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }, {headers:{}});
    console.log(token);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/login'}>
            Login page
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/login'}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                ref={usernameRef}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                ref={passwordRef}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <p className="forgot-password text-right">
              <a href="https://localhost:4000">Forgot password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
