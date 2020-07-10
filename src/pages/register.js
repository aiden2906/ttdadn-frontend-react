import React, { useState, useContext, useRef } from 'react';
import Footer from '../components/footer';
import * as env from '../configs/environment';
const axios = require('axios');

export default function Register() {
  const fullnameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post(`${env.ENDPOINT}/api.user`, {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
    });
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">Create Account</h3>
                  </div>
                  <div class="card-body">
                    <form>
                      <div class="form-row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="small mb-1" for="inputFirstName">
                              Full name
                            </label>
                            <input class="form-control py-4" id="inputFirstName" type="text" placeholder="Enter full name" ref={fullnameRef} />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="small mb-1" for="inputLastName">
                              Username
                            </label>
                            <input class="form-control py-4" id="inputLastName" type="text" placeholder="Enter username" ref={usernameRef} />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="small mb-1" for="inputEmailAddress">
                          Email
                        </label>
                        <input class="form-control py-4" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" ref={emailRef} />
                      </div>
                      <div class="form-row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="small mb-1" for="inputPassword">
                              Password
                            </label>
                            <input class="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" ref={passwordRef} />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="small mb-1" for="inputConfirmPassword">
                              Confirm Password
                            </label>
                            <input class="form-control py-4" id="inputConfirmPassword" type="password" placeholder="Confirm password" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group mt-4 mb-0" onClick={handleRegister}>
                        <a class="btn btn-primary btn-block">Create Account</a>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center">
                    <div class="small">
                      <a href="/login">Have an account? Go to login</a>
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
}
