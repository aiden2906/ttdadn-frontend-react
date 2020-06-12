import React from "react";

import Footer from "../components/footer";
import TopNav from "../components/topnav";
import SideNav from "../components/sidenav";

const Profile = () => {
  return (
    <div>
      <TopNav />
      <div id="layoutSidenav">
        <SideNav />
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid">
              <form class="form" novalidate="">
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>Full Name</label>
                          <input
                            class="form-control"
                            type="text"
                            name="name"
                            placeholder="Minh Tien Nguyen"
                            value="Minh Tien Nguyen"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>Username</label>
                          <input
                            class="form-control"
                            type="text"
                            name="username"
                            placeholder="miti99"
                            value="miti99"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>Email</label>
                          <input
                            class="form-control"
                            type="text"
                            placeholder="miti99@mail.com"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-3">
                        <div class="form-group">
                          <label>About</label>
                          <textarea
                            class="form-control"
                            rows="5"
                            placeholder="miti99's bio"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 mb-3">
                    <div class="mb-2">
                      <b>Change Password</b>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>Current Password</label>
                          <input
                            class="form-control"
                            type="password"
                            placeholder="••••••"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>New Password</label>
                          <input
                            class="form-control"
                            type="password"
                            placeholder="••••••"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label>
                            Confirm
                            <span class="d-none d-xl-inline">Password</span>
                          </label>
                          <input
                            class="form-control"
                            type="password"
                            placeholder="••••••"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col d-flex justify-content-end">
                    <button class="btn btn-primary" type="submit">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Profile;
