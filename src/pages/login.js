import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Footer from '../components/footer';
import * as env from '../configs/environment';
const axios = require('axios');

const Login = (props) => {
  const access_token = localStorage.getItem('token');
  if (access_token) {
    props.history.push('/home');
  }
  const [token, setToken] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`${env.ENDPOINT}/api.user/login`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem('token', data);
        setToken(data);
      })
      .catch((err) => console.log(err));

    //TODO: check token
  }

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">Login</h3>
                  </div>
                  <div class="card-body">
                    <form>
                      <div class="form-group">
                        <label class="small mb-1" for="inputEmailAddress">
                          Email
                        </label>
                        <input class="form-control py-4" id="inputEmailAddress" type="email" placeholder="Enter email address" ref={usernameRef} />
                      </div>
                      <div class="form-group">
                        <label class="small mb-1" for="inputPassword">
                          Password
                        </label>
                        <input class="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" ref={passwordRef} />
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox">
                          <input class="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                          <label class="custom-control-label" for="rememberPasswordCheck">
                            Remember password
                          </label>
                        </div>
                      </div>
                      <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a class="small" href="/password">
                          Forgot Password?
                        </a>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                          Login
                        </button>
                        {/* <a class="btn btn-primary" href="index.html">
                          Login
                        </a> */}
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center">
                    <div class="small">
                      <Link to="/register">Need an account? Sign up!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
