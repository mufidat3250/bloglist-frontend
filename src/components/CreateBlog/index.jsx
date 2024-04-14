import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/useField'
import Styled from 'styled-components'
import { TextField, Button } from '@mui/material'

const FormContainer = Styled.div`
  width:50%;

`
const Form = Styled.form`
  display:flex;
  flex-direction: column;
  gap:1rem;
`
const Title = Styled.h1`
  text-align: center;
`


const CreateBlog = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({ title: title.value, author: author.value, url: url.value })
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <FormContainer className='blogForm'>
      <Title>Create New</Title>
      <Form action="" onSubmit={handleNewBlog}>
        <TextField  {...title} id='title' data-testid='title' label='Title'/>
        <TextField {...author} id='author' data-testid ='author' label='Author'/>
        <TextField   {...url} id='url' data-testid = 'url' label='Url'/>
        <Button color='primary' variant='contained' type="submit"> Create</Button>
      </Form>
    </FormContainer>
  )
}

export default CreateBlog
