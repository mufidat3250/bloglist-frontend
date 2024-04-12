import React, { useState } from 'react'
import { useField } from '../../../hooks/useField'

const Login = ({ loginData }) => {
  const username = useField('text')
  const password = useField('text')


  const handleLogin = (e) => {
    e.preventDefault()
    loginData({ username:username.value, password:password.value })
    username.reset()
    password.reset()
  }
  console.log({ username, password })
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">
        <span>username </span>
        <input
          {...username}
          id='username'
          data-testid = 'username'
        />
      </label>
      <br />
      <label htmlFor='password'>
        <span>password </span>
        <input
          id='password'
          {...password}
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
