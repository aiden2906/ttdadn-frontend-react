import React, { useLayoutEffect, useContext, useState, useRef } from "react";
const axios = require("axios");

const Profile = () => {
  const [info, setInfo] = useState({});
  const newPassword = useRef();
  const confirmPassword = useRef();
  const fullnameRef = useRef(info.fullname);
  const emailRef = useRef(info.email);
  const aboutRef = useRef(info.about);
  const usernameRef = useRef(info.username);
  useLayoutEffect(() => {
    axios
      .get("http://localhost:4000/api.user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setInfo(data);
        fullnameRef.current.value = data.fullname || "";
        emailRef.current.value = data.email || "";
        aboutRef.current.value = data.about || "";
        usernameRef.current.value = data.username || "";
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (
      newPassword.current.value &&
      newPassword.current.value !== confirmPassword.current.value
    ) {
      console.log("confirm err");
      return;
    }
    axios
      .put(
        "http://localhost:4000/api.user",
        {
          fullname: fullnameRef.current.value || "",
          email: emailRef.current.value || "",
          about: aboutRef.current.value || "",
          password: newPassword.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <div class="container-fluid mt-3">
        <form class="form">
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
                      ref={fullnameRef}
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
                      ref={usernameRef}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Email</label>
                    <input class="form-control" type="text" ref={emailRef} />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <div class="form-group">
                    <label>About</label>
                    <textarea
                      class="form-control"
                      rows="4"
                      ref={aboutRef}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mb-3">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>New Password</label>
                    <input
                      class="form-control"
                      type="password"
                      ref={newPassword}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Confirm Password</label>
                    <input
                      class="form-control"
                      type="password"
                      ref={confirmPassword}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex justify-content-end">
              <button
                class="btn btn-primary"
                type="submit"
                onClick={handleEditProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Profile;
