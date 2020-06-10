import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Login = (props) => {
  const token = localStorage.getItem('token');
  if (token) {
    props.history.push('/home');
  }
  const [password, setPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (password === '123') {
      localStorage.setItem('token', '123456789');
      props.history.push('/home');
    }
    setPassword('');
    return null;
  }

  return (
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
  );
};

export default Login;
