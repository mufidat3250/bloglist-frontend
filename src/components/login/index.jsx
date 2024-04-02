import React, { useState } from 'react'

const Login = ({ loginData }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    loginData({ username, password })
    setPassword('')
    setUsername('')
  }
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">
        <span>username </span>
        <input
          type='text'
          id='username'
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          data-testid = 'username'
        />
      </label>
      <br />
      <label htmlFor='password'>
        <span>password </span>
        <input
          type="password"
          id='password'
          name='password'
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          data-testid = 'password'
        />
      </label>
      <button type="submit" style={{ cursor: 'pointer' }}>
    login
      </button>
    </form>
  )
}

export default Login
