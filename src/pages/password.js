import React, { useRef } from "react";
import Footer from "../components/footer";
const axios = require("axios");

const Password = (props) => {
  const usernameRef = useRef(null);

  const handleGetToken = (e) => {
    e.preventDefault();
    if (!usernameRef.current.value) {
      return;
    }
    axios.post("http://localhost:4000/api.user/forget-password", {
      username: usernameRef.current.value,
    });
    props.history.push("/reset-password");
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">
                      Password Recovery
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="small mb-3 text-muted">
                      Enter your username and if this is your account, you will
                      receive a token via your registered email
                    </div>
                    <form>
                      <div class="form-group">
                        <label class="small mb-1" for="inputUsername">
                          Username
                        </label>
                        <input
                          class="form-control py-4"
                          id="inputUsername"
                          aria-describedby="emailHelp"
                          placeholder="Enter username"
                          ref={usernameRef}
                        />
                      </div>
                      <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a class="small" href="/login">
                          Return to login
                        </a>
                        <a
                          class="btn btn-primary"
                          href="/login"
                          onClick={handleGetToken}
                        >
                          Get token
                        </a>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center">
                    <div class="small">
                      <a href="/register">Need an account? Sign up!</a>
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

export default Password;
