import React, { useState } from "react";

const Login = props => {
  const token = localStorage.getItem("token");
  if (token) {
    props.history.push("/home");
  }
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (password === "123") {
      localStorage.setItem("token", "123456789");
      props.history.push("/home");
    }
    setPassword("");
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-test="login__pwd"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button data-test="login__submit" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
