import React, {} from "react";

const Login = ({handleLogin, handleChange, credentials}) => {
  return (
    <form onSubmit={handleLogin}>
      <h1>Log In to Application</h1>
      <label htmlFor="username">
        <span>username </span>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="password">
        <span>password </span>
        <input
          type="password"
          id="password"
          password="password"
          onChange={handleChange}
        />
      </label>
      <button type="submit" style={{cursor:'pointer'}}>login</button>
    </form>
  );
};

export default Login;
