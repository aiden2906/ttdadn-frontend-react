import React, { useRef } from "react";
import Footer from "../components/footer";
const axios = require("axios");

const ResetPassword = (props) => {
  const tokenRef = useRef(null);
  const newPasswordRef = useRef(null);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!tokenRef.current.value || !newPasswordRef.current.value) {
      return;
    }
    axios.post("http://localhost:4000/user/reset-password", {
      token: tokenRef.current.value,
      newPassword: newPasswordRef.current.value,
    });
    props.history.push("/login");
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
                      Reset Password
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="small mb-3 text-muted">
                      Copy token which we sent you by email, please paste it in
                      here
                    </div>
                    <form>
                      <div class="form-group">
                        <label class="small mb-1" for="inputEmailAddress">
                          Token
                        </label>
                        <input
                          class="form-control py-4"
                          id="input-token"
                          type="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter token"
                          ref={tokenRef}
                        />
                        <label class="small mb-1" for="inputEmailAddress">
                          New Password
                        </label>
                        <input
                          class="form-control py-4"
                          id="input-password"
                          type="password"
                          aria-describedby="emailHelp"
                          placeholder="Enter new password"
                          ref={newPasswordRef}
                        />
                        <label class="small mb-1" for="inputEmailAddress">
                          Confirm Password
                        </label>
                        <input
                          class="form-control py-4"
                          id="input-confirm-password"
                          type="password"
                          aria-describedby="emailHelp"
                          placeholder="Enter confirm password"
                        />
                      </div>
                      <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a class="small" href="/login">
                          Return to login
                        </a>
                        <a
                          class="btn btn-primary"
                          href="/login"
                          onClick={handleResetPassword}
                        >
                          Reset Password
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

export default ResetPassword;
