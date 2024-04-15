import React from 'react'
import { useField } from '../../hooks/useField'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/loginUserReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'
import Notification from '../Notification'
import Styled from 'styled-components'


const FormContainer = Styled.div`
  width:50%;
  margin:0 auto;

`
const Form = Styled.form`
  display:flex;
  flex-direction: column;
  gap:1rem;
`
const Title = Styled.h1`
  text-align: center;
`

const Login = () => {
  const username = useField('text')
  const password = useField('text')
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    try {
      dispatch(login(username.value, password.value))
      username.onReset()
      password.onReset()
    } catch (error) {
      console.log(error)
      dispatch(setNotification('error Wrong username or password'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    }
  }
  return (
    <FormContainer>
      <Title>Log In to Application</Title>
      <Notification/>
      <Form onSubmit={handleLogin}>
        <TextField
          {...username}
          id='username'
          data-testid = 'username'
          label='username'
        />
        <TextField
          id='password'
          {...password}
          data-testid = 'password'
          label='password'
        />
        <Button  variant='contained' color='primary' type="submit" style={{ cursor: 'pointer' }}>
    login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Login
