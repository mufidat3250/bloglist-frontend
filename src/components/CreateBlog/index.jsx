import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/useField'

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
    <div className='blogForm'>
      <h2>Create New</h2>
      <form action="" onSubmit={handleNewBlog}>
        <label htmlFor="">
          <span>Title </span>
          <input  {...title} id='title' data-testid='title'/>
        </label>
        <br />
        <label htmlFor="">
          <span>Author: </span>
          <input {...author} id='author' data-testid ='author'/>
        </label>
        <br />
        <label htmlFor="">
          <span>url: </span>
          <input  {...url} id='url' data-testid = 'url'/>
        </label>
        <br />
        <button type="submit"> create</button>
      </form>
    </div>
  )
}

export default CreateBlog
