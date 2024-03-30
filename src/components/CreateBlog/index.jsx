import React, { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setAuthor('')
    setUrl('')
    setTitle('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form action="" onSubmit={handleNewBlog}>
        <label htmlFor="">
          <span>Title </span>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
        </label>
        <br />
        <label htmlFor="">
          <span>Author: </span>
          <input type="text" onChange={(e) => setAuthor(e.target.value)} value={author}/>
        </label>
        <br />
        <label htmlFor="">
          <span>url: </span>
          <input type="text" onChange={(e) => setUrl(e.target.value)} value={url}/>
        </label>
        <br />
        <button type="submit"> create</button>
      </form>
    </div>
  )
}

export default CreateBlog
